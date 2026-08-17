import { BasePermissions } from "@churchapps/apihelper";

export class Permissions extends BasePermissions {
  static ask = { edit: { contentType: "Ask", action: "Edit" }, view: { contentType: "Ask", action: "View" } };
  static people = { view: { contentType: "People", action: "View" } };
  static content = { edit: { contentType: "Content", action: "Edit" } };
}
