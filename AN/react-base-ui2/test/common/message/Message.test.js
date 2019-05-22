import { Message, MessageType } from 'src/common/message';

describe('Message', () => {
  it('init works fine', () => {
    const message = new Message();

    expect(message.type).toEqual(MessageType.ERROR);
    expect(message.title).toEqual('');
    expect(message.details).toBeUndefined();
  });

  it('init works fine', () => {
    const message = new Message(MessageType.SUCCESS, 'success', 'awesome');

    expect(message.type).toEqual(MessageType.SUCCESS);
    expect(message.title).toEqual('awesome');
    expect(message.details).toMatchObject(['success']);
  });
});

