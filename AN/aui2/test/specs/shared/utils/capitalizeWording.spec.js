import capitalizeWording from 'shared/utils/capitalizeWording';

describe('shared/utils/capitalizeWording', () => {
  test('capitalizeWording method should work fine, if param is a String', () => {
    const wording = 'permit test';
    const result = capitalizeWording(wording);
    expect(result).toEqual('Permit test');
  });
});