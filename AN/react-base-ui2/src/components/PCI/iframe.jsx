import React, { PureComponent } from 'react';
import isFunction from 'lodash/isFunction';
import {
  bool,
  string,
  func
} from 'prop-types';

import ANPCIIframe, { ERRORMESSAGES } from 'activenet-pci-iframe/lib/activenet-pci-iframe';
import uuidv4 from 'uuid/v4';

import AlertBar from '../Alert/AlertBar';
import { confirm } from '../../services/dialog';

/** Default PropTypes of Phone.
 * @memberof Phone
*/
const PCIIframePropTypes = {

  /** if debug === true, will render more debug information in console.
   * @type {bool}
 */
  debug: bool,
  /** the caller source. ex.  an-servlet, an-aui, an-cui ....
   * @type {string}
  */
  source: string.required,

  /** need return payment iframe url.
   * @type {func}
  */
  getPCICheckoutIframeUrl: func.required,
  getPCICheckoutPaymentInfoBySessionId: func.required
};

/** Default Props for Calendar */
const IframeProps = {
  source: 'an-aui',
  debug: false
};


export default class PCIIframe extends PureComponent {
  static displayName = 'PCIIframe';
  static defaultProps = IframeProps;
  static propTypes = PCIIframePropTypes;

  constructor() {
    super();

    this.state = { errorMsg: '' };
    this.divIframeId = `iframe-${uuidv4()}`;
  }

  componentDidMount = () => {
    this.instance = new ANPCIIframe({
      debug: !!this.props.debug,
      source: this.props.source,
      container: `#${this.divIframeId}`,
      api: {
        getPCICheckoutIframeUrl: this.props.getPCICheckoutIframeUrl,
        getPCICheckoutPaymentInfoBySessionId: this.props.getPCICheckoutPaymentInfoBySessionId
      }
    });
    this.showIframePromise();

    if (isFunction(this.props.getInstance)) {
      this.props.getInstance({
        showIframePromise: () => this.showIframePromise(),
        submitIframePromise: () => this.submitIframePromise(),
        isIframeLoaded: () => this.instance.iframeLoaded
      });
    }
  }

  showIframePromise() {
    return this.instance.showIframePromise()
      .catch(err => this.handleError(err));
  }

  submitIframePromise() {
    return this.instance.submitIframePromise()
      .catch(err => this.handleError(err));
  }

  handleError(err) {
    switch (err) {
      case ERRORMESSAGES.TERMINATION:
        this.setState({ errorMsg: err });
        break;
      case ERRORMESSAGES.INPROGRESS:
        confirm(err, { title: 'Error' });
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="iframeContainer" id={this.divIframeId} style={this.props.style} >
        {
          errorMsg && <AlertBar
            message={errorMsg}
            className="iframe-error"
            type="error"
            noClose
          />
        }
      </div>);
  }
}
