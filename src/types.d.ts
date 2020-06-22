
export type Problem = {
    problemName?:string,
    difficulty?:"Easy"| "Medium" |"Hard" 
}

export type Action = {
    action:string
    payload?:Problem 
}