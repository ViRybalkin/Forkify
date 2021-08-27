import view from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class resultView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'We could not find your query, please try another one';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultView();
