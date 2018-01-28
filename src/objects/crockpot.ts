import Ingredient from './ingredient';
import Recipe from './recipe';
import { isNullOrUndefined } from "util";

export default class Crockpot
{
    waiterEnabled: boolean;
    ingredients:   Ingredient[];
    recipes:       Recipe[];
    history:       Recipe[];

    constructor(waiter: boolean = false)
    {
        this.waiterEnabled = waiter;
        this.recipes = Recipe.getAll(waiter);
    }

    public add(name: string)
    {
        this.ingredients.push(new Ingredient(name, this.waiterEnabled));

        return this;
    }

    public remove(name: string, quanity: number = 1)
    {
        let ingredient = this.ingredients.find(i => i._name === name);

        if(ingredient !== null) {
            this.ingredients = this.ingredients.filter(i => i._name !== name);
        }

        return this;
    }

    public cook(recipe?: Recipe)
    {
        if(!isNullOrUndefined(recipe)) {
            this.history.push(recipe);
            this.ingredients = new Array<Ingredient>();

            return true;
        }
        else if(this.ingredients.length === 4) {
            let result = this.calculateResult();
            
            if(result) {
                this.cook(recipe);
            }

            return true;
        }

        return false;
    }

    public calculateResult()
    {
        let tagList = {};
        let ingList = [];
        let results = [];

        for(let i of this.ingredients) {
            for(let t of i.tags) {
                if(isNullOrUndefined(tagList[t.type])) {
                    tagList[t.type] = t.value;
                } else {
                    tagList[t.type] += t.value;
                }

                if(ingList.find(il => il._name === i._name)) {
                    ingList.push(i._name);
                }
            }
        }

        if(Object.keys(tagList).length <= 0) {
            return [];
        }
    
        results = this
            .recipes
            .filter(r => {
                for(let list of r.minList) {
                    for(let tag in list.tags) {
                        if(isNullOrUndefined(tagList[tag]) || tagList[tag] < list.tags[tag]) {
                            return false;
                        }
                    }

                    for(let name in list.names) {
                        if(ingList.find(i => i === name)) {
                            return false;
                        }
                    }
                }

                for(let maxMix of r.maxMix) {
                    if(!isNullOrUndefined(tagList[maxMix.tag]) && tagList[maxMix.tag] >= maxMix.amt) {
                        return false;
                    }
                }
            
                for(let badName of Object.keys(r.maxNames)) {
                    if(ingList.find(i => i === badName)) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a: Recipe, b: Recipe) => {
                return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
            });

        if(ingList.length === 4) {
            return results[0];
        }

        return results;        
    }
}