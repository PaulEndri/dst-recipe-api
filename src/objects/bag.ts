import Ingredient from './ingredient';

export default class Bag
{
    waiterEnabled: boolean;
    ingredients: Ingredient[];

    constructor(waiter: boolean = false)
    {
        this.waiterEnabled = waiter;
    }

    public add(name: string)
    {
        let found = this.ingredients.find(i => i._name === name);

        if(found) {
            found.count += 1;
        } else {
            this.ingredients.push(new Ingredient(name, this.waiterEnabled));
        }
    }

    public remove(name: string, quanity: number = 1)
    {
        let ingredient = this.ingredients.find(i => i._name === name);

        if(ingredient !== null) {
            if(ingredient.count === quanity) {
                this.ingredients = this.ingredients.filter(i => i._name !== name);
            } else {
                ingredient.count -= quanity;
            }
        }
    }
}