import Tag from './tag';
const ingredients       = require('../data/ingredients');
const waiterIngredients = require('../data/waiterIngredients');

export default class Ingredient {
    name:   string;
    tags:   Tag[];
    count:  number;
    _name:  string;
    prefab: string;

    constructor(needle, waiter=false) {
        this.tags    = new Array<Tag>();
        this.count   = 0;
        let haystack = waiter ? ingredients: waiterIngredients;
        let result   = haystack.find(h => h.prefab == needle) || false;

        if(result === false) {
            throw new Error("Invalid Ingredient");
        }

        for(let key of Object.keys(result.tags)) {
            this.tags.push(new Tag(key, result.tags[key]));
        }

        this.name   = result.name;
        this.prefab = result.prefab;
        this._name  = needle;
        this.count  = 0;
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

        return source.map(s => {
            return new Ingredient(s.prefab, waiter)
        })
    }
}