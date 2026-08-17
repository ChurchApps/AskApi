import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import express from "express";

// @churchapps/apihelper pulls winston-cloudwatch (and its AWS SDK peer, supplied by the
// lambda layer) at import time, so it is stubbed here the same way the helper tests do it.
// The stub mirrors the real CustomBaseController: actionWrapper runs the handler with
// whatever authUser() produces and does NOT reject a missing JWT -- the behaviour this
// controller exists to fix.
class AuthenticatedUserStub {
  jwt: string;
  churchId: string;
  permissions: string[];

  constructor(principal: any) {
    this.jwt = principal?.details?.jwt || "";
    this.churchId = principal?.details?.churchId || "";
    this.permissions = principal?.details?.permissions || [];
  }

  checkAccess(permission: { contentType: string; action: string }) {
    return this.permissions.includes(`${permission.contentType}__${permission.action}`);
  }
}

mock.module("@churchapps/apihelper", {
  namedExports: {
    AuthenticatedUser: AuthenticatedUserStub,
    BasePermissions: class BasePermissions {},
    CustomBaseController: class CustomBaseController {
      httpContext: any;

      authUser() {
        return new AuthenticatedUserStub(this.httpContext.user ?? {});
      }

      denyAccess(errors: string[]) {
        return { json: { errors }, statusCode: 401 };
      }

      async actionWrapper(_req: express.Request, _res: express.Response, fetchFunction: (au: any) => unknown) {
        return fetchFunction(this.authUser());
      }
    }
  }
});

const { AskBaseController } = await import("./AskBaseController.js");

class TestController extends AskBaseController {
  public view(req: express.Request, res: express.Response) {
    return this.actionWrapper(req, res, () => "allowed");
  }

  public edit(req: express.Request, res: express.Response) {
    return this.actionWrapperEdit(req, res, () => "allowed");
  }

  public peopleData(req: express.Request, res: express.Response) {
    return this.actionWrapper(req, res, (au) => (this.hasPeopleView(au) ? "allowed" : this.denyAccess(["Unauthorized"])));
  }
}

const req = {} as express.Request;
const res = {} as express.Response;

type UserDetails = { jwt?: string; churchId?: string; permissions: string[] } | null;

const controllerFor = (details: UserDetails) => {
  const controller = new TestController();
  (controller as unknown as { httpContext: unknown }).httpContext = { user: details === null ? null : { details } };
  return controller;
};

const churchJwt = { jwt: "jwt", churchId: "church1" };
const denied = { json: { errors: ["Unauthorized"] }, statusCode: 401 };

const users: Record<string, UserDetails> = {
  anonymous: null,
  noJwt: { churchId: "church1", permissions: ["Ask__View"] },
  noChurch: { jwt: "jwt", permissions: ["Ask__View"] },
  member: { ...churchJwt, permissions: ["People__Edit Self", "Attendance__Checkin"] },
  peopleStaff: { ...churchJwt, permissions: ["People__View"] },
  contentStaff: { ...churchJwt, permissions: ["Content__Edit"] },
  askViewer: { ...churchJwt, permissions: ["Ask__View"] },
  askEditor: { ...churchJwt, permissions: ["Ask__Edit"] }
};

describe("AskBaseController view gate", () => {
  for (const key of ["anonymous", "noJwt", "noChurch", "member"] as const) {
    it(`rejects ${key}`, async () => {
      assert.deepEqual(await controllerFor(users[key]).view(req, res), denied);
    });
  }

  for (const key of ["peopleStaff", "contentStaff", "askViewer", "askEditor"] as const) {
    it(`allows ${key}`, async () => {
      assert.equal(await controllerFor(users[key]).view(req, res), "allowed");
    });
  }
});

describe("AskBaseController edit gate", () => {
  for (const key of ["anonymous", "member", "peopleStaff"] as const) {
    it(`rejects ${key}`, async () => {
      assert.deepEqual(await controllerFor(users[key]).edit(req, res), denied);
    });
  }

  for (const key of ["contentStaff", "askEditor"] as const) {
    it(`allows ${key}`, async () => {
      assert.equal(await controllerFor(users[key]).edit(req, res), "allowed");
    });
  }
});

describe("people-data gate", () => {
  it("rejects Content.edit-only staff", async () => {
    assert.deepEqual(await controllerFor(users.contentStaff).peopleData(req, res), denied);
  });

  for (const key of ["peopleStaff", "askViewer", "askEditor"] as const) {
    it(`allows ${key}`, async () => {
      assert.equal(await controllerFor(users[key]).peopleData(req, res), "allowed");
    });
  }
});
