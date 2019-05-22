import {
  bookingHelper
} from 'index/Resource/components/FullCalendar/utils';

it('method bookingHelper works fine', () => {
  const $document = $(document);

  bookingHelper.addItem('test', $document)
  bookingHelper.deleteItem('test', $document)
  bookingHelper.clear()
  bookingHelper.setRootDom($document)
  bookingHelper.clear()
  bookingHelper.select('test', $document)
  bookingHelper.selectSingle = false
  bookingHelper.select('test', $document)

  bookingHelper.list = new Map()
  bookingHelper.select('test', $document)
  bookingHelper.events
});

