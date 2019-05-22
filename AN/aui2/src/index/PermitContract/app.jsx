import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Public from 'shared/components/Root/public';
import renderRoot, { initServices } from 'shared/components/Root';
import store from './store';
import PermitContract from './index';

const { initialData } = store.getState();
const { isFromCui } = initialData;

if (isFromCui) {
  initServices(initialData);
  ReactDOM.render(
    <Provider store={store}>
      <Public>
        <PermitContract />
      </Public>
    </Provider>, document.getElementById('app-root')
  );
} else {
  renderRoot(store, PermitContract, true);
}
