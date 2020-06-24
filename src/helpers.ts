// Converts the given individuval time parts to human readable form
export function getTimeasString(seconds: number, mins: number, hours: number) {

  if (hours > 0) {
    return `${normalize(hours)} hr`;
  } else if (mins > 0) {
    return `${normalize(mins)} m `;
  } else if (seconds > 0) {
    return `${normalize(seconds)} s`;
  }
}
// Removes trailing zeroes from the TimeStamp
function normalize(num: number) {
  let n = Math.floor(num);
  return n;
}

