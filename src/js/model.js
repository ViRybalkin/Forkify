import * as config from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${config.BASE_URL}/${id}?key=${config.KEY}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source_url: recipe.source_url,
      title: recipe.title,
      cooking_time: recipe.cooking_time,
    };
  } catch (e) {
    console.log(e);
  }
};
