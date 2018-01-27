import { isNullOrUndefined } from "util";

export default abstract class BaseObject {
    generate(needle:any, haystack:any, returnVal:boolean) {
        if(!isNullOrUndefined(haystack[needle])) {
            let object = haystack[needle];

            if(returnVal) {
                return object;
            }

            for(let key of Object.keys(object)) {
                this[key] = object[key];
            }
        }

        return null;
    }
}