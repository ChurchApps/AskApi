export interface PeopleSearchFilter {
  field?: string;
  value?: string;
  operator?: string;
}

// Membership search applies `notEqual`. The old prompt name was `notEquals`, which matches nobody.
export function normalizePeopleSearchFilters<T extends PeopleSearchFilter>(filters: T[]): T[] {
  return filters.map((filter) => (filter?.operator === "notEquals" ? { ...filter, operator: "notEqual" } : filter));
}
