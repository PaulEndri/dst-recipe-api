import BaseObject from './_baseObject';
import recipes from '../data/recipes';
import waiterRecipes from '../data/waiterRecipes';

export default class Recipe extends BaseObject {
    cookername   : string;
    perishtime   : number;
    foodtype     : string;
    maxmix       : any;
    maxtagsd     : any;
    cooktime     : number;
    priority     : number;
    hunger       : number;
    mintags      : any;
    sanity       : number;
    maxnames     : any;
    minmix       : any;
    minlist      : any;
    name         : string;
    times_cooked : number;
    minnames     : any;
    test         : any;
    weight       : number;
    health       : number;

    constructor(needle, waiter=false) {
        super();
        let haystack = waiter ? recipes : waiterRecipes;

        this.generate(needle, haystack, false);
    }

    get cookerName() {
        return this.cookername;
    }

    set cookerName(v) {
        this.cookername = v
    }
}