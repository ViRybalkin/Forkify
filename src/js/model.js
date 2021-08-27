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
  bookmark: [],
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

    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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
    state.search.page = 1;
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

const persistBookmark = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addBookmark = recipe => {
  state.bookmark.push(recipe);
  if ((recipe.id = state.recipe.id)) state.recipe.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = id => {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};
init();

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};
clearBookmarks();
