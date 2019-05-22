import React from 'react';
import ReactDOM from 'react-dom';

import Loading from './Loading';
import LoadingCounter from './LoadingCounter';

var loadingCounter = new LoadingCounter();
// There only should be one global loading instance
var loadingInstance = void 0;

function _close(div) {
  // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
  var unmountResult = ReactDOM.unmountComponentAtNode(div);

  unmountResult && div.parentNode && div.parentNode.removeChild(div);
}

function show() {
  if (loadingCounter.isEmpty()) {
    var div = document.createElement('div');

    document.body.appendChild(div);

    ReactDOM.render(React.createElement(Loading, null), div);

    loadingInstance = {
      close: function close() {
        loadingCounter.clear();
        _close(div);
      },
      counter: loadingCounter
    };
  }

  loadingCounter.add();

  return loadingInstance;
}

function hide() {
  loadingCounter.dec();

  if (loadingCounter.isEmpty()) {
    loadingInstance.close();
  }
}

function reset() {
  loadingCounter.clear();
}

export { show, hide, reset };