export function getTimeasString(seconds:number,mins:number,hours:number)
{
    if(hours > 0){
        return `${hours.toString()} hr`
    }
    else if(mins >0 ){
        return `${mins.toString()} m `;

    }
    else if( seconds > 0){
        return `${seconds.toString()} s`
    }

}