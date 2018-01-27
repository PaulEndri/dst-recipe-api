import BaseObject from './_baseObject';
const recipes = require('../data/recipes');
const waiterRecipes = require('../data/waiterRecipes');

export default class Recipe extends BaseObject {
    cookername   : string;
    perishtime   : number;
    foodtype     : string;
    maxmix       : {
       amt : number,
       tag : string 
    }[];
    maxtags      : any;
    cooktime     : number;
    priority     : number;
    hunger       : number;
    mintags      : any;
    sanity       : number;
    maxnames     : any;
    minmix       : any;
    minlist      : {
        tags  : any,
        names : any
    }[];
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

    get maxNames() {
        return this.maxnames;
    }

    get minTags() {
        return this.mintags;
    }

    get minNames() {
        return this.minnames;
    }

    get minList() {
        return this.minlist;
    }

    get minMix() {
        return this.minmix;
    }

    get maxTags() {
        return this.maxtags;
    }

    get cookTime() {
        return this.cooktime;
    }

    get maxMix() {
        return this.maxmix;
    }

    get cookerName() {
        return this.cookername;
    }

    get foodType() {
        return this.foodType;
    }

    get perishTime() {
        return this.perishtime;
    }

    static getAll(waiter: boolean = false) {
        let source  = waiter ? waiterRecipes : recipes;
        let results = new Array<Recipe>();

        for(var key of Object.keys(source)) {
            results.push(new Recipe(source));
        }

        return results;
    }
}