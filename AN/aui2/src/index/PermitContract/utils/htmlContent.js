import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import pdfStyle from '!css!less!./pdf.less'; // eslint-disable-line
import { optionsEnum } from '../consts/optionsEnum';

const globalIgnores = [
  'script',
  'div.actions',
  'div.modal-wrap',
  'div.loading-bar',
  '.permit-contract-page > div > div.section-separator',
  'i.icon',
  '.help-link',
  '.permit-help-link'
];

const selectors = {
  permit: {
    hiddenRecurrings: 'section.booking-summary tr.child.normal-booking.u-hidden',
    hiddenExceptionDates: 'section.booking-summary tr.exception-dates.u-hidden',
    hiddenBreakdownFee: 'section.booking-summary .resource-booking-summary tr.child.u-hidden',
    visibleRecurrings: 'section.booking-summary tr.child.normal-booking:not(.u-hidden)',
    visibleExceptionDates: 'section.booking-summary tr.exception-dates:not(.u-hidden)',
    visibleFees: 'section.booking-summary tr.child:not(.normal-booking):not(.u-hidden)',
    font: 'font',
    ignores: globalIgnores.concat([
      'h1:not(.permit__title)',
      'section.schedules',
      'section.amendments'
    ])
  },
  schedules: {
    hiddenRecurrings: 'section.schedules tr.child.u-hidden',
    hiddenExceptionDates: 'section.schedules tr.exception-dates.u-hidden',
    visibleRecurrings: 'section.schedules tr.child:not(.u-hidden)',
    visibleExceptionDates: 'section.schedules tr.exception-dates:not(.u-hidden)',
    ignores: globalIgnores.concat([
      'h1:not(.schedule__title)',
      'section.deposit',
      'section.payment-refund',
      'section.payment-schedules',
      'section.amendments',
      'section.attachment',
      '.permit-contract-page > div > div.widget',
      '.permit-contract-page > div > div.event-info-section'
    ])
  },
  amendment: {
    ignores: globalIgnores.concat([
      'h1:not(.amendment__title)',
      'section.deposit',
      'section.payment-refund',
      'section.payment-schedules',
      'section.schedules',
      'section.attachment',
      '.permit-contract-page > div > div.widget',
      '.permit-contract-page > div > div.event-info-section',
      '.permit-contract-page > div > div.widget',
      '.permit-contract-page > div > div.event-info-section'
    ])
  }
};

const callbacks = {
  hide: (node) => { node.classList.add('u-hidden'); },
  show: (node) => { node.classList.remove('u-hidden'); },
  setColor: (node) => { node.style.color = node.color; }
};

const replaceTags = (html) => {
  // remove HTML comments
  let temp = html.replace(/<!--.*?-->/gi, '');

  temp = temp.replace(/<img([^>]*?)>/gi, '<img$1 />');
  temp = temp.replace(/<param([^>]*?)>/gi, '<param$1 />');
  // make up tags
  temp = temp.replace(/<link([^>]*?)>/gi, '<link$1 />');
  temp = temp.replace(/<meta([^>]+?)>/gi, '<meta$1 />');
  temp = temp.replace(/<input([^>]+?)>/gi, '<input$1 />');
  temp = temp.replace(/<br([^>]*?)>/gi, '<br$1 />');
  temp = temp.replace(/<hr([^>]*?)>/gi, '<hr />');

  temp = temp.replace(/&amp;/gi, '&amp;amp;');
  temp = temp.replace(/&quot;/gi, '&amp;quot;');
  temp = temp.replace(/&nbsp;/gi, '&amp;nbsp;');
  temp = temp.replace(/&lt;/gi, '&amp;lt;');
  temp = temp.replace(/&gt;/gi, '&amp;gt;');
  temp = temp.replace(/&cent;/gi, '&amp;cent;');
  temp = temp.replace(/&pound;/gi, '&amp;pound;');
  temp = temp.replace(/&yen;/gi, '&amp;yen;');
  temp = temp.replace(/&euro;/gi, '&amp;euro;');
  temp = temp.replace(/&sect;/gi, '&amp;sect;');
  temp = temp.replace(/&copy;/gi, '&amp;copy;');
  temp = temp.replace(/&reg;/gi, '&amp;reg;');
  temp = temp.replace(/&trade;/gi, '&amp;trade;');
  temp = temp.replace(/&times;/gi, '&amp;times;');
  temp = temp.replace(/&divide;/gi, '&amp;divide;');

  return `<!DOCTYPE html [<!ENTITY nbsp "&#160;"> ]><html>${temp}</html>`;
};

const updatePageContainer = (dom) => {
  const pageContainer = dom.querySelector('.page-container');
  pageContainer.classList.remove('printing');
  pageContainer.classList.remove('printing-recurring');
  pageContainer.classList.remove('printing-no-recurring');
  pageContainer.classList.remove('printing-permit');
  pageContainer.classList.remove('printing-schedule');
  pageContainer.classList.remove('printing-amendment');
  pageContainer.classList.remove('printing-breakdown-fee');
  pageContainer.classList.add('pdf');
};

const remove = (node) => {
  /* istanbul ignore else */
  if (node && node.parentNode && node.parentNode.removeChild) {
    if (node.previousSibling && /section-separator/.test(node.previousSibling.className)) {
      remove(node.previousSibling);
    }
    node.parentNode.removeChild(node);
  }
};

const removeClass = (node, className, callback) => {
  forEach(
    node.querySelectorAll(`.${className}`),
    (el) => {
      el.classList.remove(className);
      /* istanbul ignore else */
      if (isFunction(callback)) {
        callback(el);
      }
    }
  );
};

const removeNodes = (dom, nodeSelectors) => {
  nodeSelectors.forEach((selector) => {
    forEach(dom.querySelectorAll(selector), node => remove(node));
  });
};

const expandSections = (dom) => {
  forEach(
    dom.querySelectorAll('.collapse-panel__body.collapsed'),
    (collapsed) => {
      forEach(['collapsed', 'hidden'], className => collapsed.classList.remove(className));
      collapsed.classList.add('expanded');
    }
  );
};

const loopNodes = (rootNode, selector, callback) => {
  forEach(rootNode.querySelectorAll(selector), callback);
};

const addStyle = (dom, styleContent) => {
  const head = dom.querySelector('head');
  const style = document.createElement('style');
  style.textContent = styleContent;
  head.appendChild(style);
};

const setLogoWidthHeight = (dom) => {
  const permitLogo = document.querySelector('.permit-logo img');
  const copyPermitLogo = dom.querySelector('.permit-logo img');

  if (copyPermitLogo) {
    const logoWidth = permitLogo.offsetWidth;
    const logoHeight = permitLogo.offsetHeight;

    copyPermitLogo.setAttribute('style', `width: ${logoWidth}px; height: ${logoHeight}px;`);
  }

  return dom;
};

const setWaiverImgWidthHeight = (dom) => {
  const signatureImgs = document.querySelectorAll('.waiver-signature-line img');

  if (signatureImgs && signatureImgs.length) {
    const copySignatureImgs = dom.querySelectorAll('.waiver-signature-line img');

    forEach(signatureImgs, (signatureImg, index) => {
      const width = signatureImg.naturalWidth;
      const height = signatureImg.naturalHeight;
      const maxWidth = 258;
      const maxHeight = 77;

      /* istanbul ignore next */
      const rate = (maxWidth / width < maxHeight / height) ? maxWidth / width : maxHeight / height;

      /* istanbul ignore next */
      copySignatureImgs[index].setAttribute('style',
        `width: ${rate > 1 ? width : width * rate}px;
        height: ${rate > 1 ? height : height * rate}px;`);
    });
  }

  return dom;
};

const getPermitHtmlContent = (containsRecurring, showBreakdownFee) => {
  const { hide, show, setColor } = callbacks;
  const { permit: {
    hiddenRecurrings,
    hiddenBreakdownFee,
    hiddenExceptionDates,
    visibleRecurrings,
    visibleExceptionDates,
    visibleFees,
    font,
    ignores
  } } = selectors;

  const dom = document.documentElement.cloneNode(true);

  updatePageContainer(dom);
  removeNodes(dom, ignores);
  expandSections(dom);
  loopNodes(dom, visibleFees, hide);
  if (containsRecurring) {
    loopNodes(dom, hiddenRecurrings, show);
    loopNodes(dom, visibleExceptionDates, hide);
  } else {
    loopNodes(dom, visibleRecurrings, hide);
    loopNodes(dom, hiddenExceptionDates, show);
  }

  if (showBreakdownFee) {
    loopNodes(dom, hiddenBreakdownFee, show);
  }

  ['format-amount', 'format-amount-paid', 'format-balance'].forEach((className) => {
    removeClass(dom, className, (el) => { el.classList.add('align-right'); });
  });

  ['payment-refund-table', 'deposit-table'].forEach((className) => {
    removeClass(dom, className);
  });

  loopNodes(dom, font, setColor);
  addStyle(dom, pdfStyle);

  setLogoWidthHeight(dom);
  setWaiverImgWidthHeight(dom);

  return replaceTags(dom.innerHTML);
};

const getScheduleHtmlContent = (containsRecurring) => {
  const { hide, show } = callbacks;
  const { schedules: {
    hiddenRecurrings,
    hiddenExceptionDates,
    visibleRecurrings,
    visibleExceptionDates,
    ignores
  } } = selectors;

  const dom = document.documentElement.cloneNode(true);

  dom.querySelector('.schedule__title').style.display = 'block';

  updatePageContainer(dom);
  removeNodes(dom, ignores);
  expandSections(dom);
  if (containsRecurring) {
    loopNodes(dom, hiddenRecurrings, show);
    loopNodes(dom, visibleExceptionDates, hide);
  } else {
    loopNodes(dom, visibleRecurrings, hide);
    loopNodes(dom, hiddenExceptionDates, show);
  }

  addStyle(dom, pdfStyle);
  setLogoWidthHeight(dom);

  return replaceTags(dom.innerHTML);
};

const getAmendmentHtmlContent = () => {
  const { amendment: { ignores } } = selectors;
  const dom = document.documentElement.cloneNode(true);

  dom.querySelector('.amendment__title').style.display = 'block';

  updatePageContainer(dom);
  removeNodes(dom, ignores);
  expandSections(dom);

  addStyle(dom, pdfStyle);
  setLogoWidthHeight(dom);

  return replaceTags(dom.innerHTML);
};

export const getHtmlContent = (contentOption, containsRecurring, showBreakdownFee) => { // eslint-disable-line
  if (contentOption === optionsEnum.permit) {
    return getPermitHtmlContent(containsRecurring, showBreakdownFee);
  } else if (contentOption === optionsEnum.schedule) {
    return getScheduleHtmlContent(containsRecurring);
  } else if (contentOption === optionsEnum.amendment) {
    return getAmendmentHtmlContent();
  }
};
