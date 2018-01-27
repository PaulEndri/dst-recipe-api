import BaseObject from './_baseObject';
import Tag from './tag';
const ingredients       = require('../data/ingredients');
const waiterIngredients = require('../data/waiterIngredients');

export default class Ingredient extends BaseObject {
    name : string;
    tags : Tag[];
    count: number;

    constructor(needle, waiter=false) {
        super();
        let haystack = waiter ? ingredients : waiterIngredients;
        let result   = this.generate(needle, haystack, true);

        if(!result) {
            throw new Error("Invalid Ingredient");
        }

        for(let key of Object.keys(result)) {
            this.tags.push(new Tag(key, result[key]));
        }

        this.name  = needle;
        this.count = 0;
    }

    public hasTag(key: string) {
        for(var tag of this.tags) {
            if(tag.type === key) {
                return true;
            }
        }

        return false;
    }

    public getTag(key: string) {
        if(this.hasTag(key)) {
            return this.tags.filter(t => t.type === key);
        }

        return null;
    }

    static getAll(waiter: boolean = false) {
        let source = waiter ? waiterIngredients : ingredients;

        return Object.keys(source).map(s => {
            return new Ingredient(s);
        });
    }
}