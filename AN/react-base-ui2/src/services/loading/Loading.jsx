import React from 'react';
import ReactDOM from 'react-dom';
import isElement from 'lodash/isElement';
import debounce from 'lodash/debounce';
import has from 'lodash/has';
import LoadingBar from '../../components/LoadingBar';

class Loading {
  constructor(targetElement = document.body, options = { wait: 500 }) {
    if (!targetElement) {
      targetElement = document.body;
    } else if (targetElement && !isElement(targetElement)) {
      options = targetElement;
      targetElement = document.body;
    }

    this.tartgetElement = targetElement;
    this.options = options;
    this.wrapperElement = this.tartgetElement.appendChild(document.createElement('div'));
    this.counter = 0;
    this.transactions = {};

    this.hideMe = debounce(() => {
      if (this.counter === 0) {
        ReactDOM.unmountComponentAtNode(this.wrapperElement);
      }
    }, this.options.wait);
  }

  isLoading() {
    return this.counter > 0;
  }

  show() {
    if (this.counter === 0) {
      const { text = '', spinSize = 'lg' } = this.options;
      try {
        ReactDOM.render(
          <LoadingBar fullScreen text={text} spinSize={spinSize} />,
          this.wrapperElement
        );
      } catch (e) {
        console.error(e);
        this.counter = -1;
      }
    }

    this.counter = this.counter + 1;
    return this;
  }

  hide() {
    if (this.counter > 0) {
      this.counter = this.counter - 1;

      if (this.counter === 0) {
        this.hideMe();
      }
    }
  }

  startTransaction(name = 'default') {
    if (has(this.transactions, name)) {
      console.warn(`Transaction ${name} already exist`);
    } else {
      this.transactions[name] = setTimeout(() => {
        const id = this.transactions[name];
        if (id) {
          console.warn(`Transaction ${name} time out`);
          this.endTransaction(name);
        }
      }, 30000);
      this.show();
    }
  }

  endTransaction(name) {
    const id = this.transactions[name];
    if (id) {
      clearTimeout(id);
      delete this.transactions[name];
      this.hide();
    } else {
      console.warn(`Transaction ${name} not found`);
    }
  }
}

export default Loading;
