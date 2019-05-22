import {
  duration, ssn, phone, zipcode
} from 'index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question/rules';

describe('index/modules/Daycare/EnrollForm/components/EnrollDetailSection/Question/rules', () => {
  describe('rule: duration', () => {
    it('validation shall work well', () => {
      let err = duration('00:00:00');
      expect(err).toEqual('required');

      err = duration('01:02:03');
      expect(err).toEqual('');
    });
  });

  describe('rule: ssn', () => {
    it('validation shall work fine', () => {
      let err = ssn('');
      expect(err).toEqual('');

      err = ssn('abc', true);
      expect(err).toEqual('ssn_invalid_characters');

      err = ssn('abc', false, 2);
      expect(err).toEqual('ssn_long');

      err = ssn('abc', false, 3);
      expect(err).toEqual('');
    });
  });

  describe('rule: phone', () => {
    it('validation shall work fine', () => {
      let err = phone();
      expect(err).toEqual('');

      err = phone('', '', 'ext', 'CA');
      expect(err).toEqual('phone_wholenumber_extnumber');

      err = phone('', '12', '1234', 'CA');
      expect(err).toEqual('phone_missing_areacode');

      err = phone('12', '123', '1234', 'CA');
      expect(err).toEqual('phone_areacode_3');

      err = phone('are', '123', '1234', 'CA');
      expect(err).toEqual('phone_wholenumber_areacode');

      err = phone('123', '', '1234', 'CA');
      expect(err).toEqual('phone_missing_phonenumber');

      err = phone('123', 'abc', '1234', 'CA');
      expect(err).toEqual('phone_invalid_characters');

      err = phone('123', '123456', '1234', 'CA');
      expect(err).toEqual('phone_must_7');

      err = phone('123', '1234567', '1234', 'CA');
      expect(err).toEqual('');

      err = phone('123', '123456', 'ext', 'AU');
      expect(err).toEqual('phone_wholenumber_extnumber');

      err = phone('', '', '1234', 'AU');
      expect(err).toEqual('');

      err = phone('', '1234', '1234', 'AU');
      expect(err).toEqual('phone_missing_areacode');

      err = phone('123', '1234', '', 'AU');
      expect(err).toEqual('phone_areacode_2');

      err = phone('ab', '1234', '', 'AU');
      expect(err).toEqual('phone_wholenumber_areacode');

      err = phone('12', '', '', 'AU');
      expect(err).toEqual('phone_missing_phonenumber');

      err = phone('12', 'abc', '', 'AU');
      expect(err).toEqual('phone_invalid_characters');

      err = phone('12', '1234', '', 'AU');
      expect(err).toEqual('phone_must_8');

      err = phone('12', '12345678', '', 'AU');
      expect(err).toEqual('');

      err = phone('123', '123456', 'ext', 'NZ');
      expect(err).toEqual('phone_wholenumber_extnumber');

      err = phone('', '', '1234', 'NZ');
      expect(err).toEqual('');

      err = phone('', '1234', '1234', 'NZ');
      expect(err).toEqual('phone_missing_areacode');

      err = phone('123', '1234', '', 'NZ');
      expect(err).toEqual('phone_areacode_2');

      err = phone('ab', '1234', '', 'NZ');
      expect(err).toEqual('phone_wholenumber_areacode');

      err = phone('12', '', '', 'NZ');
      expect(err).toEqual('phone_missing_phonenumber');

      err = phone('12', 'abc', '', 'NZ');
      expect(err).toEqual('phone_invalid_characters');

      err = phone('12', '1234', '', 'NZ');
      expect(err).toEqual('phone_must_7');

      err = phone('12', '1234567', '', 'NZ');
      expect(err).toEqual('');

      err = phone('', '', '', 'CHN');
      expect(err).toEqual('');

      err = phone('', 'phone', '', 'CHN');
      expect(err).toEqual('phone_invalid_characters');

      err = phone('', '123456789012345678901', '', 'CHN');
      expect(err).toEqual('phone_must_20');

      err = phone('', '12345678', 'ext', 'CHN');
      expect(err).toEqual('phone_wholenumber_extnumber');

      err = phone('', '12345678', '123', 'CHN');
      expect(err).toEqual('');
    });
  });

  describe('rule: zipcode', () => {
    it('validation shall work fine', () => {
      let err = zipcode('123456a');
      expect(err).toEqual('zipcode_us_invalidcharacter');

      err = zipcode('123456');
      expect(err).toEqual('zipcode_us_incorrectnumber');

      err = zipcode('12345-6789');
      expect(err).toEqual('');

      err = zipcode('3', 'CA');
      expect(err).toEqual('zipcode_ca_invalid');

      err = zipcode('T T', 'CA');
      expect(err).toEqual('zipcode_ca_invalid');

      err = zipcode('T9S9S9S9S9S9S', 'CA');
      expect(err).toEqual('zipcode_ca_toolong');

      err = zipcode('T9S', 'CA');
      expect(err).toEqual('');

      err = zipcode('freeform?', '', 'CHN');
      expect(err).toEqual('');
    });
  });
});
