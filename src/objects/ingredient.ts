import BaseObject from './_baseObject';
import Tag from './tag';

const ingredients       = require('../../data/ingredients.json');
const waiterIngredients = require('../../data/ingredients.json');

export default class Ingredient extends BaseObject {
    tags : Tag[];

    constructor(needle, waiter=false) {
        super();
        let haystack = waiter ? ingredients : waiterIngredients;
        let result   = this.generate(needle, haystack, true);
        let tagKeys  = Object.keys(result);

        for(let key of tagKeys) {
            this.tags.push(new Tag(key, result[key]));
        }
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
}