import Recipe from "../objects/recipe";
import Ingredient from "../objects/ingredient";
import { isNullOrUndefined } from "util";
import tag from "../objects/tag";

export default class RecipeService
{
    recipes: Recipe[];

    constructor(waiterEnabled: boolean = false)
    {
        this.recipes = Recipe.getAll(waiterEnabled);
    }l

    public findAvailable(ingredients: Ingredient[])
    {
        let tagList = {};
        let ingList = [];
        let results = [];

        for(let i of ingredients) {
            for(let t of i.tags) {
                if(isNullOrUndefined(tagList[t.type])) {
                    tagList[t.type] = t.value;
                } else {
                    tagList[t.type] += t.value;
                }

                if(ingList.find(il => il.name === i.name)) {
                    ingList.push(i.name);
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
                        if(ingList.find(i => i.name === name)) {
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
                    if(!isNullOrUndefined(tagList[badName]) && tagList[badName] >= r.maxNames[badName]) {
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