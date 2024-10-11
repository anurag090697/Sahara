/** @format */

import { v4 as uuidv4 } from "uuid";

export function generateUniqueId(length = 11) {
  const uuidString = uuidv4();
  const str = uuidString.split("-").join("");
  const uniqueId = "UPIS" + str.substring(0, 11).toUpperCase();
//   console.log(uniqueId.length); 
  return uniqueId;
}
