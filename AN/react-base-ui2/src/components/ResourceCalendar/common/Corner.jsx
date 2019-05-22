import React from 'react';


class Corner extends React.PureComponent {

  render() {
    const { cornerLabel } = this.props;
    return (
      <div className="an-rc-grid an-rc-grid-corner">
        <div className="grid-cell">
          <div className="cell-content">
            <span>{cornerLabel}</span>
          </div>
        </div>
      </div>
    );
  }
}


export default Corner;
