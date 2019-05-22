import htmlStringContainsText from 'index/PermitContract/utils/htmlStringContainsText';

it('method htmlStringContainsText should work fine', () => {
  const htmlString1 = ' <div><span></span>\r\n <div>\n</div>  </div> ';
  expect(htmlStringContainsText(htmlString1)).toBeFalsy();

  const htmlString2 = ' <div><span></span>\r\n 123<div>\n</div>  </div> ';
  expect(htmlStringContainsText(htmlString2)).toBeTruthy();
});
