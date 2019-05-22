import React from 'react';

import Saved from './Saved';
import New from './New';
import Tab from './Tab';

export {
  Tab
};

export const name = 'ECheck';

export default class ECheck extends React.Component {

  render() {
    return (
      <div>
        <Saved {...this.props} />
        <New {...this.props} />
      </div>
    );
  }
}
