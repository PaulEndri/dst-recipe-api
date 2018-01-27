import Recipe from './objects/recipe';
import Ingredient from './objects/ingredient';
import Tag from './objects/tag';
import Bag from './objects/bag';
import Library from './services/recipes';

var object = {
    Objects : {
        Recipe,
        Ingredient,
        Tag,
        Bag
    },
    Library
};
module.exports = object;