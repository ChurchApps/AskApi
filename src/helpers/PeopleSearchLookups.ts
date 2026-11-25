import { PeopleSearchFilter } from "./PeopleSearchFilters.js";

// One "additional API call" the model asked for, with the people-search extras the prompt defines.
export interface LookupCall {
  apiName?: string;
  method?: string;
  path?: string;
  fields?: unknown;
  // True when the question is negative ("hasn't attended", "not in the choir"): the people found are excluded.
  exclude?: boolean | string;
  // The model only knows a group by name; the controller resolves it to a groupId before the call runs.
  groupName?: string;
}

// personIds is null when the lookup could not be run or resolved.
export interface LookupResult {
  exclude: boolean;
  personIds: string[] | null;
}

export function isExcludeCall(call: LookupCall): boolean {
  return call?.exclude === true || call?.exclude === "true";
}

export function personIdsOf(rows: unknown[]): string[] {
  const ids = new Set<string>();
  for (const row of rows) {
    const id = (row as { personId?: unknown })?.personId;
    if (typeof id === "string" && id !== "") ids.add(id);
  }
  return [...ids];
}

// The people-search Api takes `in` / `notIn` as a comma list and matches it as a set, so one
// condition per lookup is enough and several lookups narrow each other.
//  - a question we could not answer (failed call, unknown group) must never fall through to the
//    whole church, so it becomes `id in ""`, which matches nobody;
//  - a negative question whose lookup found nobody excludes nobody, so it adds no condition.
export function lookupIdFilter(personIds: string[] | null, exclude: boolean): PeopleSearchFilter | null {
  if (personIds === null) return { field: "id", operator: "in", value: "" };
  if (!exclude) return { field: "id", operator: "in", value: personIds.join(",") };
  if (personIds.length === 0) return null;
  return { field: "id", operator: "notIn", value: personIds.join(",") };
}

export function mergeLookupFilters<T extends PeopleSearchFilter>(filters: T[], lookups: LookupResult[]): PeopleSearchFilter[] {
  const result: PeopleSearchFilter[] = [...filters];
  for (const lookup of lookups) {
    const filter = lookupIdFilter(lookup.personIds, lookup.exclude);
    if (filter) result.push(filter);
  }
  return result;
}

function queryOf(path: string): URLSearchParams {
  const idx = path.indexOf("?");
  return new URLSearchParams(idx === -1 ? "" : path.substring(idx + 1));
}

// The group name on a /groupmembers call that still needs a groupId; null for any other call.
export function groupNameOf(call: LookupCall): string | null {
  const path = String(call?.path || "");
  const pathname = path.split("?")[0].toLowerCase();
  if (pathname !== "/groupmembers") return null;
  const query = queryOf(path);
  if (query.has("groupId") || query.has("groupIds")) return null;
  const name = (query.get("groupName") ?? call.groupName ?? "").trim();
  return name === "" ? null : name;
}

// Exact name first (ignoring case), then the one group whose name contains the words. Ambiguity is a miss.
export function resolveGroupCall(call: LookupCall, groups: { id?: string; name?: string }[]): LookupCall | null {
  const wanted = groupNameOf(call)?.toLowerCase();
  if (!wanted) return null;
  const named = (groups || []).filter((g) => typeof g?.id === "string" && g.id !== "" && typeof g?.name === "string");
  let match = named.find((g) => g.name!.trim().toLowerCase() === wanted);
  if (!match) {
    const partial = named.filter((g) => g.name!.toLowerCase().includes(wanted));
    if (partial.length === 1) match = partial[0];
  }
  if (!match) return null;
  const { groupName: _groupName, ...rest } = call;
  return { ...rest, path: `/groupmembers?groupId=${encodeURIComponent(match.id!)}` };
}
