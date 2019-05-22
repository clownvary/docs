import { getHtmlContent } from 'index/PermitContract/utils/htmlContent';
import { optionsEnum } from 'index/PermitContract/consts/optionsEnum';

const createElement = (type, classNames = [], child) => {
  const el = document.createElement(type);
  classNames.forEach((className) => {
    el.classList.add(className);
  });
  if (child) {
    el.appendChild(child)
  }
  return el;
}

const createBookingTable = () => {
  const t = document.createElement('table');
  const tr = createElement('tr');
  [
    'format-amount',
    'format-amount-paid',
    'format-balance'
  ].forEach((className) => {
    tr.appendChild(createElement('td', [className]));
  });

  t.appendChild(tr);
  t.appendChild(createElement('tr', ['child', 'normal-booking', 'u-hidden']));
  t.appendChild(createElement('tr', ['child', 'normal-booking']));
  return t
}

const createScheduleTable = () => {
  const t = document.createElement('table');
  t.appendChild(createElement('tr'));
  t.appendChild(createElement('tr', ['child', 'u-hidden']));
  t.appendChild(createElement('tr', ['child']));
  return t
}

describe('index/PermitContract/utils/htmlContent.js', () => {

  let pageContainer;
  let parser;

  beforeEach(() => {
    parser = new DOMParser()

    const div = createElement('div')
    const page = createElement('div', ['permit-contract-page'], div);
    div.appendChild(createElement('div', ['permit-logo']));
    div.appendChild(createElement('div', ['waiver-signature-line']));
    div.appendChild(createElement('section', ['booking-summary'], createBookingTable()));
    div.appendChild(createElement('div', ['section-separator']));
    div.appendChild(createElement('section', ['schedules'], createScheduleTable()));
    div.appendChild(createElement('div', ['section-separator']));
    div.appendChild(createElement('section', ['amendments']));
    div.appendChild(createElement('font'))

    pageContainer = createElement('div', ['page-container'])
    pageContainer.appendChild(createElement('div', ['collapse-panel__body', 'collapsed']))
    pageContainer.appendChild(createElement('div', ['actions']));
    pageContainer.appendChild(page)

    document.body.appendChild(pageContainer);
  });

  afterEach(() => {
    document.body.removeChild(pageContainer);
  })

  test('getHtmlContent get HTML content for permit correctly', () => {
    let dom;

    const contentWithoutRecurrings = getHtmlContent(optionsEnum.permit);
    dom = parser.parseFromString(contentWithoutRecurrings, 'text/html');
    expect(dom.querySelector('section.schedules')).toBeNull();
    expect(dom.querySelector('section.amendments')).toBeNull();
    expect(dom.querySelector('.booking-summary tr.child.normal-booking:not(.u-hidden)')).toBeNull();
    expect(dom.querySelector('.section.booking-summary .resource-booking-summary tr.child.u-hidden')).toBeNull();

    const contentWithRecurrings = getHtmlContent(optionsEnum.permit, true);
    dom = parser.parseFromString(contentWithRecurrings, 'text/html');
    expect(dom.querySelector('section.schedules')).toBeNull();
    expect(dom.querySelector('section.amendments')).toBeNull();
    expect(dom.querySelector('.booking-summary tr.child.normal-booking.u-hidden')).toBeNull();
    expect(dom.querySelector('.section.booking-summary .resource-booking-summary tr.child.u-hidden')).toBeNull();

    const showBreakdownFeePermit = getHtmlContent(optionsEnum.permit, false, true);
    expect(dom.querySelector('section.schedules')).toBeNull();
    expect(dom.querySelector('section.amendments')).toBeNull();
    expect(dom.querySelector('.section.booking-summary .resource-booking-summary tr.child.u-hidden')).toBeNull();
  });

  test('getHtmlContent get HTML content for permit correctly, if have a Logo and a waiver image', () => {
    const logoContainer = pageContainer.querySelector('.permit-logo');
    const waiverImgContainer = pageContainer.querySelector('.waiver-signature-line');

    logoContainer.appendChild(createElement('img'));
    waiverImgContainer.appendChild(createElement('img'));

    const permitTables = pageContainer.querySelectorAll('.collapse-panel__body');

    if (permitTables && permitTables.length) {
      permitTables.forEach((table) => {
        table.setAttribute('class', 'section-separator');
      });
    }

    let dom;

    const content = getHtmlContent(optionsEnum.permit);
    dom = parser.parseFromString(content, 'text/html');
    expect(dom.querySelector('section.schedules')).toBeNull();
    expect(dom.querySelector('section.amendments')).toBeNull();
    expect(dom.querySelector('.booking-summary tr.child.normal-booking:not(.u-hidden)')).toBeNull();
  });

  test('getHtmlContent get HTML content for schedule correctly', () => {
    let dom;
    pageContainer.appendChild(createElement('h1', ['schedule__title']));

    const contentWithoutRecurrings = getHtmlContent(optionsEnum.schedule);
    dom = parser.parseFromString(contentWithoutRecurrings, 'text/html');
    expect(dom.querySelector('section:not(.schedules)')).toBeTruthy();
    expect(dom.querySelector('tr.child:not(.u-hidden)')).toBeTruthy();

    const contentWithRecurrings = getHtmlContent(optionsEnum.schedule, true);
    dom = parser.parseFromString(contentWithRecurrings, 'text/html');
    expect(dom.querySelector('section:not(.schedules)')).toBeTruthy();
    expect(dom.querySelector('tr.child.u-hidden')).toBeTruthy();
  });

  test('getHtmlContent get HTML content for amendment correctly', () => {
    let dom;
    pageContainer.appendChild(createElement('h1', ['amendment__title']));

    const content = getHtmlContent(optionsEnum.amendment);
    dom = parser.parseFromString(content, 'text/html');
    expect(dom.querySelector('section:not(.amendments)')).toBeTruthy();

  });

  test('getHtmlContent get undefined for invalid option', () => {
    expect(getHtmlContent()).toBeUndefined();
  })
});
