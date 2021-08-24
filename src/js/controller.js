import * as model from './model';
import recipeView from './view/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const container = document.querySelector('.recipe');

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const init = () => {
  recipeView.addHandlerRender(controlRecipe);
};
init();
