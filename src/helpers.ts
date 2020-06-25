// Converts the given individuval time parts to human readable form
export function getTimeasString(seconds: number, mins: number, hours: number) {

  if (hours > 0 && mins >0 ) {
    return `${normalize(hours)}hr ${normalize(mins)}minutes`;
  } 
  else if(hours > 0 ){
    return `${normalize(hours)} hour`;
  }
  
  else if (mins > 0) {
    return `${normalize(mins)} minutes`;
  } else if (seconds > 0) {
    return `${normalize(seconds)} seconds`;
  }
}
// Removes trailing zeroes from the TimeStamp
export function normalize(num: number) {

  let n = Math.floor(num);
  return n;
}


