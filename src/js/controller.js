import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultView from './view/resultView';
import bookmarksView from './view/bookmarksView';
import paginationView from './view/paginationView';
import addRecipeView from './view/addRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmark);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearch = async () => {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearch(query);
    resultView.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (e) {
    console.log(e);
  }
};

const controllPagination = goToPage => {
  resultView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};

const controllServing = newServings => {
  model.updateServing(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmark);
};

const controlBookmark = () => {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = () => {
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerUpdateServing(controllServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controllPagination);
  recipeView.addHandlerRender(controlRecipe);
};
init();
