import * as model from './model';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultView from './view/resultView';
import bookmarksView from './view/bookmarksView';
import paginationView from './view/paginationView';

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

controlBookmark = () => {
  bookmarksView.render(model.state.bookmark);
};

const init = () => {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controllServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controllPagination);
};
init();
