import React from 'react';
import classNames from 'classnames';

export default class AddButton extends React.PureComponent {
  handleClick = () => {
    const { isEnableAdd, hasAddableStagesequence } = this.props;
    if (isEnableAdd && hasAddableStagesequence) {
      this.props.loadAddAbleStageSequences();
    }
  }

  render() {
    const { hasAddableStagesequence, isEnableAdd } = this.props;
    const cls = classNames('header-section__add-link', {
      'icon--disabled': !isEnableAdd || !hasAddableStagesequence
    });

    return (
      <span
        className={cls}
        onClick={this.handleClick}
      >
        <i className="icon icon-plus-circle" />
          Add stage sequence
      </span>
    );
  }
}
