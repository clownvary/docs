export function formatTypesData(_data, permitExpirationDate, defaultExpirationDate) {
  let selected = null;

  const data = _data.map((item) => {
    let expirationDate = '';

    if (item.hold_type_id === 0) {
      expirationDate = '';
    } else if (item.hold_type_id === 1) {
      /* istanbul ignore next */
      expirationDate = permitExpirationDate || defaultExpirationDate;
    } else {
      expirationDate = permitExpirationDate;
    }

    if (item.selected) {
      selected = item.hold_type_id + 1; // if id = 0; dropDown default no selected, need to fix.
    }
    return {
      text: item.hold_type_name,
      value: item.hold_type_id + 1, // if id = 0; dropDown default no selected, need to fix.
      id: item.hold_type_id,
      selected: item.selected,
      expirationDateAllowed: item.expiration_date_allowed,
      expirationDateRequired: item.expiration_date_required,
      systemUserNamesAllowed: item.system_user_names_allowed,
      permitExpirationDate: expirationDate
    };
  });

  return {
    data,
    selected
  };
}

export function getUsersSelected(usersDetailList) {
  const usersList = usersDetailList.filter(v => !!v.selected);
  const selected = [];

  usersList.forEach((user) => {
    selected.push(user.id);
  });

  return selected;
}

export function changeTypeSelected(_datas, value) {
  const datas = _datas.map((data) => {
    const item = data;
    item.selected = item.value === value;
    return item;
  });
  return datas;
}

export function changeExpirationDate(_datas, expirationDate) {
  const datas = _datas.map((data) => {
    const item = data;
    if (item.selected) {
      item.permitExpirationDate = expirationDate;
    }
    return item;
  });
  return datas;
}

export function changeUsersSelected(_datas, values) {
  const datas = _datas.map((data) => {
    const item = data;
    values.forEach((value) => {
      item.selected = false;
      if (item.value === value) {
        item.selected = true;
      }
    });
    return item;
  });

  return datas;
}
