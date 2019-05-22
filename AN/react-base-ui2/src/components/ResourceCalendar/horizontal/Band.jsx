import React from 'react';
import ResourceCell from '../common/ResourceCell';

class Band extends React.PureComponent {
  renderRow(resource) {
    const { onRemove, onResourceHeaderClick, rowHeight } = this.props;
    const style = {};
    if (rowHeight > 0) {
      style.height = `${rowHeight}px`;
    }

    return (
      <tr className="grid-row" style={style} key={resource.id}>
        <ResourceCell
          resource={resource}
          onClear={onRemove}
          onResourceHeaderClick={onResourceHeaderClick}
        />
      </tr>
    );
  }

  render() {
    const { resources = [] } = this.props;
    return (
      <table className="an-rc-grid an-rc-grid-band an-rc-band-resource">
        <tbody>
          {
            resources.map(resource => (
              this.renderRow(resource)
            ))
          }
        </tbody>
      </table>
    );
  }
}


export default Band;
