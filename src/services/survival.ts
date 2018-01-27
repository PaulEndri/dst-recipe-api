import Recipe from '../objects/recipe';
import Ingredient from '../objects/ingredient';
import Bag from '../objects/bag';

class Survival {
    bag:          Bag;
    knownRecipes: Recipe[];
    
    constructor(waiterEnabled: boolean = false) {
        this.bag = new Bag(waiterEnabled);

    }

    availableRecipes() {

    }
}