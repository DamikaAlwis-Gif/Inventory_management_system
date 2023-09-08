import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // convert items array to lodash wrapper object
  // slice the array from startIndex to startIndex + pageSize
  // convert lodash wrapper object to regular array
  return _(items).slice(startIndex).take(pageSize).value();
}