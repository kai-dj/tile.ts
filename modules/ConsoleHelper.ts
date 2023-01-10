export function logJSON(object:any):void {
    console.log(JSON.stringify(object, null, 2));
};

export function log(toLog:any):void {
    console.log(toLog);
};
