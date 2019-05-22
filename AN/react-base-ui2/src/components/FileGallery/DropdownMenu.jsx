import React from 'react';
import { Dock } from '../../consts';
import { attachPopupMenu, clearPopupMenu } from '../../services/menu';

export default class DropdownMenu extends React.Component {
  componentDidMount() {
    const { readonly } = this.props;

    const items = [
      { text: 'Download', value: 'Download' }
    ];
    if (!readonly) {
      items.push({ text: 'Delete', value: 'Delete' });
    }
    const menuOptions = {
      data: items,
      onSelected: this.onMenuSelected
    };
    const popupOptions = {
      dockStyle: Dock.TOP_LEFT,
      className: `${this.props.prefix}-menu`,
      target: this.toggleIcon
    };

    attachPopupMenu(
      '',
      menuOptions,
      popupOptions
    );
  }

  componentWillUnmount() {
    clearPopupMenu(this.toggleIcon);
  }

  onMenuSelected = ({ value }) => {
    if (value === 'Download') {
      this.props.download(this.props.item);
    } else {
      this.props.deleteFile(this.props.fileIndex);
    }
  }

  render() {
    return (
      <span className={`${this.props.prefix}-item-menu`}>
        <i
          className="icon icon-chevron-down"
          ref={(c) => { this.toggleIcon = c; }}
        />
      </span>
    );
  }
}
