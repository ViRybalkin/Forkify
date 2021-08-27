import view from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class bookmarksView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new bookmarksView();
