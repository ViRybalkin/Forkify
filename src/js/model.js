import * as config from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    perPage: config.PER_PAGE,
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${config.BASE_URL}/${id}?key=${config.KEY}`);
    const { recipe } = data.data;
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
    console.log(recipe);
  } catch (e) {
    throw e;
  }
};
export const loadSearch = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${config.BASE_URL}/?search=${query}?key=${config.KEY}`
    );
    const { recipes } = data.data;
    state.search.result = recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (e) {
    throw e;
  }
};
export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;
  return state.search.result.slice(start, end);
};

export const updateServing = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
