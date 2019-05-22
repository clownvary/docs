import React from 'react';
import debounce from 'lodash/debounce';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import { Dock } from 'react-base-ui/lib/consts';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import './index.less';

export default class Associations extends React.PureComponent {
  constructor(props) {
    super(props);

    this.debouncedShowAssociations = debounce(this.debouncedShowAssociations, 400);
  }

  onMouseEnter = (e) => {
    e.persist();
    this.debouncedShowAssociations(e);
  }

  onMouseLeave = () => {
    this.debouncedShowAssociations.cancel();
    Tooltip.close();
  }

  debouncedShowAssociations(e) {
    const tooltipOptions = {
      dockStyle: Dock.TOP_CENTER,
      distance: 5,
      content: this.renderAssociationsNode(),
      className: 'tooltip-associations'
    };

    Tooltip.open(e.target, tooltipOptions);
  }

  renderAssociationsNode() {
    const { data } = this.props;

    return (
      <SafeText
        text={data.join(' / ')}
      />
    );
  }

  render() {
    return (
      <span
        className="stage-associations"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderAssociationsNode()}
      </span>
    );
  }
}
