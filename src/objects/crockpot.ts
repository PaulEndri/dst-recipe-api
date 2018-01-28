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
        this.ingredients = new Array<Ingredient>();
        this.history = new Array<Recipe>();
    }

    public add(name: string)
    {
        this.ingredients.push(new Ingredient(name, this.waiterEnabled));

        return this;
    }

    public remove(name: string, quantity: number = 1)
    {
        let ingredient = this.ingredients
        let removed = 0;
        if(ingredient !== null) {
            let tmp = this.ingredients.map(i => {
                if(removed < quantity && i._name === name) {
                    removed += 1;
                    return null;
                }

                return i;
            }).filter(i => i !== null);

            this.ingredients = tmp;

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
        let ingList = {};
        let results = [];

        for(let i of this.ingredients) {
            for(let t of i.tags) {
                if(isNullOrUndefined(tagList[t.type])) {
                    tagList[t.type] = t.value;
                } else {
                    tagList[t.type] += t.value;
                }
            }

            
            if(isNullOrUndefined(ingList[i._name])) {
                ingList[i._name] = 1;
            } else {
                ingList[i._name] += 1
            }
        }

        if(Object.keys(tagList).length <= 0) {
            return [];
        }
    
        results = this
            .recipes
            .filter(r => {
                let listResults = r.minList.map(list => {
                    for(let tag in list.tags) {
                        if(isNullOrUndefined(tagList[tag]) || tagList[tag] < list.tags[tag]) {
                            return false;
                        }
                    }

                    for(let name of Object.keys(list.names)) {
                        if(isNullOrUndefined(ingList[name]) || ingList[name] < list.names[name]) {
                            return false;
                        }
                    }

                    return list;
                }).filter( Boolean );

                if(listResults.length <= 0) {
                    return false;
                }

                for(let maxMix of r.maxMix) {
                    if(!isNullOrUndefined(tagList[maxMix.tag]) && tagList[maxMix.tag] > maxMix.amt) {
                        return false;
                    }
                }
            
                for(let badName of Object.keys(r.maxnames)) {
                    if(!isNullOrUndefined(ingList[badName])) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a: Recipe, b: Recipe) => {
                return a.priority < b.priority ? 1 : b.priority < a.priority ? -1 : 0;
            });

        if(this.ingredients.length === 4) {
            return results[0];
        }

        return results;        
    }
}