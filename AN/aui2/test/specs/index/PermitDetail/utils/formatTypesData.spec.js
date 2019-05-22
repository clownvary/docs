import {
  formatTypesData,
  getUsersSelected,
  changeTypeSelected,
  changeExpirationDate,
  changeUsersSelected,
  getReturnAPIDateFormat
} from 'index/PermitDetail/utils/formatTypesData';


it('index -> PermitDetail -> utils -> formatTypesDataFunction', () => {
  const _data = [
    {
      selected: false,
      hold_type_id: 0,
      hold_type_name: 'Normal',
      expiration_date_required: false,
      expiration_date_allowed: false,
      system_user_names_allowed: false
    },
    {
      selected: false,
      hold_type_id: 1,
      hold_type_name: 'Tentative',
      expiration_date_required: true,
      expiration_date_allowed: true,
      system_user_names_allowed: false
    },
    {
      selected: true,
      hold_type_id: 2,
      hold_type_name: 'Temporary',
      expiration_date_required: false,
      expiration_date_allowed: true,
      system_user_names_allowed: true
    }
  ];
  const permitExpirationDate = 'Jul 12, 2016';
  const defaultExpirationDate = 'Jul 14, 2016';
  const result = {
    selected: 3,
    data: [
      {
        text: 'Normal',
        value: 1,
        id: 0,
        selected: false,
        expirationDateAllowed: false,
        expirationDateRequired: false,
        systemUserNamesAllowed: false,
        permitExpirationDate: ''
      },
      {
        text: 'Tentative',
        value: 2,
        id: 1,
        selected: false,
        expirationDateAllowed: true,
        expirationDateRequired: true,
        systemUserNamesAllowed: false,
        permitExpirationDate: 'Jul 12, 2016'
      },
      {
        text: 'Temporary',
        value: 3,
        id: 2,
        selected: true,
        expirationDateAllowed: true,
        expirationDateRequired: false,
        systemUserNamesAllowed: true,
        permitExpirationDate: 'Jul 12, 2016'
      }
    ]
  };
  expect(formatTypesData(_data, permitExpirationDate, defaultExpirationDate)).toEqual(result);
});

it('index -> PermitDetail -> utils -> getUsersSelectedFunction', () => {
  const usersDetailList = [
    {
      id: 1,
      selected: false,
      name: 'name1'
    },
    {
      id: 2,
      selected: true,
      name: 'name2'
    }
  ];
  expect(getUsersSelected(usersDetailList)).toEqual([2]);
});

it('index -> PermitDetail -> utils -> changeTypeSelectedFunction', () => {
  const _datas = [
    {
      selected: false,
      value: 'name1'
    },
    {
      selected: true,
      value: 'name2'
    }
  ];
  const value = 'name2';
  expect(changeTypeSelected(_datas, value)).toEqual([{ selected: false, value: 'name1' }, { selected: true, value: 'name2' }]);
});

it('index -> PermitDetail -> utils -> changeExpirationDateFunction', () => {
  const _datas = [
    {
      text: 'Normal',
      value: 1,
      id: 0,
      selected: false,
      expirationDateAllowed: false,
      expirationDateRequired: false,
      systemUserNamesAllowed: false,
      permitExpirationDate: ''
    },
    {
      text: 'Tentative',
      value: 2,
      id: 1,
      selected: false,
      expirationDateAllowed: true,
      expirationDateRequired: true,
      systemUserNamesAllowed: false,
      permitExpirationDate: 'Jul 12, 2016'
    },
    {
      text: 'Temporary',
      value: 3,
      id: 2,
      selected: true,
      expirationDateAllowed: true,
      expirationDateRequired: false,
      systemUserNamesAllowed: true,
      permitExpirationDate: 'Jul 12, 2016'
    }
  ];
  const expirationDate = '"Jul 14, 2016"';
  const result = [
    {
      expirationDateAllowed: false,
      expirationDateRequired: false,
      id: 0,
      permitExpirationDate: '',
      selected: false,
      systemUserNamesAllowed: false,
      text: 'Normal',
      value: 1
    },
    {
      expirationDateAllowed: true,
      expirationDateRequired: true,
      id: 1,
      permitExpirationDate: 'Jul 12, 2016',
      selected: false,
      systemUserNamesAllowed: false,
      text: 'Tentative',
      value: 2
    },
    {
      expirationDateAllowed: true,
      expirationDateRequired: false,
      id: 2,
      permitExpirationDate: '"Jul 14, 2016"',
      selected: true,
      systemUserNamesAllowed: true,
      text: 'Temporary',
      value: 3
    }
  ];
  expect(changeExpirationDate(_datas, expirationDate)).toEqual(result);
});


it('index -> PermitDetail -> utils -> changeUsersSelectedFunction', () => {
  const _datas = [
    {
      id: 179,
      name: '#Becky 0118',
      selected: false,
      text: '#Becky 0118',
      value: 179
    },
    {
      id: 133,
      name: 'Becky 0512 long long long long long long long long long',
      selected: false,
      text: 'Becky 0512 long long long long long long long long long',
      value: 133
    },
    {
      id: 230,
      name: '$flynn 1',
      selected: false,
      text: '$flynn 1',
      value: 230
    },
    {
      id: 231,
      name: '@flynn 2',
      selected: false,
      text: '@flynn 2',
      value: 231
    },
    {
      id: 218,
      name: 'éGrace 3 site',
      selected: false,
      text: 'éGrace 3 site',
      value: 218
    },
    {
      id: 243,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 243
    },
    {
      id: 258,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 258
    },
    {
      id: 232,
      name: 'flynn 2',
      selected: false,
      text: 'flynn 2',
      value: 232
    },
    {
      id: 281,
      name: 'Grace 3 site',
      selected: false,
      text: 'Grace 3 site',
      value: 281
    },
    {
      id: 242,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 242
    },
    {
      id: 259,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 259
    }
  ];
  const values = [179, 133];
  const result = [
    {
      id: 179,
      name: '#Becky 0118',
      selected: false,
      text: '#Becky 0118',
      value: 179
    },
    {
      id: 133,
      name: 'Becky 0512 long long long long long long long long long',
      selected: true,
      text: 'Becky 0512 long long long long long long long long long',
      value: 133
    },
    {
      id: 230,
      name: '$flynn 1',
      selected: false,
      text: '$flynn 1',
      value: 230
    },
    {
      id: 231,
      name: '@flynn 2',
      selected: false,
      text: '@flynn 2',
      value: 231
    },
    {
      id: 218,
      name: 'éGrace 3 site',
      selected: false,
      text: 'éGrace 3 site',
      value: 218
    },
    {
      id: 243,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 243
    },
    {
      id: 258,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 258
    },
    {
      id: 232,
      name: 'flynn 2',
      selected: false,
      text: 'flynn 2',
      value: 232
    },
    {
      id: 281,
      name: 'Grace 3 site',
      selected: false,
      text: 'Grace 3 site',
      value: 281
    },
    {
      id: 242,
      name: 'a1 a1',
      selected: false,
      text: 'a1 a1',
      value: 242
    },
    {
      id: 259,
      name: 'AA Demo AA Demo',
      selected: false,
      text: 'AA Demo AA Demo',
      value: 259
    }
  ];
  expect(changeUsersSelected(_datas, values)).toEqual(result);
});


