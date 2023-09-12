import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  console.log("items", items);
  console.log("pageNumber", pageNumber);
  console.log("pageSize", pageSize);
  
  
  let startIndex = (pageNumber - 1) * pageSize;
  if(items.length < startIndex) {
  startIndex = 0;
  } 
  // convert items array to lodash wrapper object
  // slice the array from startIndex to startIndex + pageSize
  // convert lodash wrapper object to regular array
  return _(items).slice(startIndex).take(pageSize).value();
}