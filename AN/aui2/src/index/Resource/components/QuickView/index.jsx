import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import UIComponent from 'shared/components/UIComponent';
import { isIE } from 'react-base-ui/lib/utils/browser';
import { Authority } from 'shared/authorities';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import {
  setQuickViewAsyncAction,
  deleteQuickViewAsyncAction,
  saveQuickViewAsyncAction,
  showQuickViewModelAction,
  changeQuickViewTypeAction,
  saveQuickViewErrorAction
} from '../../actions/quickView';

import QuickViewPopup from './QuickViewPopup';

import {
  saveFilters
} from '../../actions/resourceFilters';

import quickViewType from '../../consts/quickViewType';

import './index.less';

export class QuickView extends UIComponent {

  onRemove(id, selectedViewId) {
    this.props.deleteQuickViewAsyncAction(id, selectedViewId);
  }

  onShowNewModal(isShow) {
    this.props.showQuickViewModelAction(isShow);
  }

  onChangeQuickView = (data) => {
    this.props.setQuickViewAsyncAction(data.value)
      .then(() => this.props.saveFilters());
  }

  render() {
    const { quickView, hasSelectedResources } = this.props;
    const dataList = quickView.get('data').toJS();
    const selectedView = quickView.get('selectedView');
    const showModal = quickView.get('showModal');
    const errorMessage = quickView.get('errorMessage');
    const selectedViewType = quickView.get('selectedViewType');
    // local veiw: 30  global view: 45
    const maxLength = 75;
    const disabledButton = (selectedView !== -1 || !hasSelectedResources
      || dataList.length > maxLength);
    const toolTip = dataList.length > maxLength ? `Maixmum ${maxLength} quick views can be saved` : 'Save quick view';
    const hasGlobalQuickViewAuth = Authority.isEnabled('addGlobalQuickView');
    const { GLOBAL_VIEW } = quickViewType;

    return (
      <div className={`quick-view ${isIE() ? 'quick-view-bottom' : ''}`}>
        <Dropdown
          showTextTip
          menuLocateRight
          data={dataList}
          value={selectedView}
          disabled={!dataList.length}
          maxHeight={{ maxHeight: '345px' }}
          onChange={this.onChangeQuickView}
          prefix="Quick View :"
          deleteitemTemplate={
            (data, ccs, clickFunc) => {
              const val = da.get(data, 'value');
              const text = decodeHtmlStr(da.get(data, 'text'));
              const isGlobalView = da.get(data, 'scope_type') === GLOBAL_VIEW;

              return (
                <li
                  key={val}
                  title={text}
                  className={` ${ccs} aaui-flexbox`}
                >
                  {
                    isGlobalView ?
                      <span className="view-type-label global-label">G</span>
                    : <span className="view-type-label local-label">L</span>
                  }

                  <span
                    className="dropdown-item__label"
                    onClick={() => { clickFunc(); }}
                  >{text}</span>

                  {
                    !isGlobalView || hasGlobalQuickViewAuth ?
                      <span className="icon icon-remove" onClick={() => { this.onRemove(val, selectedView); }} />
                    : null
                  }
                </li>
              );
            }
          }
          placeholder="None"
        />

        <button
          disabled={disabledButton}
          className={`icon icon-save icon-btn-save ${disabledButton ? 'disabled-button' : 'enabled-button'}`}
          onClick={() => { this.onShowNewModal(true); }}
          title={toolTip}
        />

        {
          showModal ?
            <QuickViewPopup
              showModal={showModal}
              errorMessage={errorMessage}
              selectedViewType={selectedViewType}
              showQuickViewModelAction={this.props.showQuickViewModelAction}
              saveQuickViewAsyncAction={this.props.saveQuickViewAsyncAction}
              changeQuickViewTypeAction={this.props.changeQuickViewTypeAction}
              saveQuickViewErrorAction={this.props.saveQuickViewErrorAction}
            /> : null
        }
      </div>
    );
  }
}

export default connect(
  null,
  {
    setQuickViewAsyncAction,
    deleteQuickViewAsyncAction,
    saveQuickViewAsyncAction,
    showQuickViewModelAction,
    saveFilters,
    changeQuickViewTypeAction,
    saveQuickViewErrorAction
  }
)(QuickView);
