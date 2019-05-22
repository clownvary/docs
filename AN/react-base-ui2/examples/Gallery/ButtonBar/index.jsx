import React from 'react';
import map from 'lodash/map';
import ButtonBar from 'src/components/ButtonBar';
import ButtonBarMd from 'doc/api/components/ButtonBar/ButtonBar.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

export default class Page extends DemoPage {
  static meta = {
    name: 'ButtonBar',
    icon: 'icon-columns',
    documents: [ButtonBarMd],
    description: 'This example demonstrates the features of ButtonBar.'
  };

  constructor(props) {
    super(props);
    this.state = { show: false, settings: this.state.settings, x: 0 };
  }

  onButtonMouseEnter(e) {
    const target = e.target;
    const x = target.offsetLeft;
    const y = target.offsetTop;
    this.setState({ show: true, x });
  }

  onButtonMouseLeave() {
    this.setState({ show: false });
  }

  getInitSettings() {
    return initSettings;
  }


  getProps() {
    const { settings } = this.state;

    const data = [
      {
        id: 'button1',
        loading: false,
        text: 'button1',
        disabled: false,
        className: 'button1-gap',
        menuData: [
          {
            text: 'Isaac test running cart',
            value: 140
          }, {
            text: 'kaely test running cart',
            value: 123440
          }, {
            text: 'kaely test running cart',
            value: 60.43
          }
        ]
      },
      {
        id: 'button2',
        loading: false,
        icon: 'icon-list-m',
        disabled: false,
        className: 'button2-gap'
      },
      {
        id: 'button3',
        loading: false,
        text: 'button3',
        disabled: false
      }
    ];


    const pickedProps = pickProps(settings, ['disabled', 'size', 'type', 'loading']);

    const result = map(data, (item) => {
      item.size = pickedProps.size;
      item.type = pickedProps.type;
      item.loading = pickedProps.loading;

      return item;
    });


    const props = {
      data: result,
      disabled: false,
      className: 'button-bar',
      onButtonClick: (e, { id }) => { this.log(`Click the button ${id} `); },
      onButtonMouseHover: (e, { id }) => { this.log(`Hover the button ${id}`); },
      onButtonMouseEnter: (e, { id }) => { this.log(`Enter the button ${id}`); },
      onButtonMouseLeave: (e, { id }) => { this.log(`Leave the button ${id}`); },
      onButtonMenuSelect: (e) => {
        this.log(`${e.text} is selected in context ${e.id}`);
      }
    };

    props.onButtonMouseEnter = (e, { id }) => { id === 'button3' && this.onButtonMouseEnter(e); };
    props.onButtonMouseLeave = (e, { id }) => { id === 'button3' && this.onButtonMouseLeave(e); };

    props.disabled = pickedProps.disabled;

    return props;
  }

  renderContent() {
    const { show, x } = this.state;

    const props = this.getProps();

    const items = [
      {
        description: 'Isaac test running cart',
        reservation_fee: 140
      }, {
        description: 'kaely test running cart',
        reservation_fee: 123440
      }, {
        description: 'kaely test running cart',
        reservation_fee: 60.43
      }
    ];

    return (
      <div className="buttonBar-example">
        <ButtonBar {...props} />
        <ul className={`list ${show ? '' : 'u-hidden'}`} style={{ position: 'absolute', left: `${x}px` }}>
          {
          items.map((item, index) => (
            <li key={index}>
              <span>{item.description}</span>
              <span>{item.reservation_fee}</span>
            </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
