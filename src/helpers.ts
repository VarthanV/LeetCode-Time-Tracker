export function getTimeasString(seconds:number,mins:number,hour:number)
{
    let secondString:string;
    let minuteString:string;
    let hourString:string;
    if(seconds < 10) secondString = "0" + seconds;
    if(mins < 10) minuteString = "0" + mins;
    if(hour < 10) hourString = "0" +hour;
    return ((hour > 0 ? hourString + ":" : "") + minuteString + ":" + secondString);

}