import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import AmendmentInfo from './AmendmentInfo';
import './index.less';

class Amendment extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  onExpandHandler = () => {
    const subResizeTables = Array.prototype.slice.call(document.querySelectorAll('table.amendment-sort-table-sub'));

    /* istanbul ignore else */
    if (subResizeTables.length) {
      subResizeTables.forEach(target => createColResizable(target));
    }
  }

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { amendments, showEmployee } = this.props;
    const panelTitle = 'Amendments';
    const ariaLabel = `${panelTitle} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;

    return (
      <CollapsePanel
        title={panelTitle}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container amendments"
        onExpand={() => { this.onExpandHandler(); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        <div>
          {
            amendments.map((amendment, index) => {
              const title = `AMENDMENT #${amendments.length - index}`;

              return (
                <AmendmentInfo
                  amendment={amendment}
                  key={`amendment_${index}`}
                  title={title}
                  showEmployee={showEmployee}
                />
              );
            })
          }
        </div>
      </CollapsePanel>
    );
  }
}

export default Amendment;
