import {
  fromJS
} from 'immutable';
import isEmpty from 'lodash/isEmpty';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import {
  isArrEqual
} from 'shared/utils/func';

import {
  DEFAULT_DATE,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_CENTER,
  CHANGE_STATUS,
  CHANGE_FACILITY_TYPE,
  CHANGE_EVENT_TYPE,
  CLEAR_ERRMSG,
  UPDATE_SEARCH_VALUE,
  CHANGE_CREATE_BY_ME
} from '../actions/permitFilter';

function generateFilterTags(state) {
  const objCenters = state.get('centers').toJS();
  const objStatus = state.get('status').toJS();
  const objFacilityTypes = state.get('facilityTypes').toJS();
  const objEventTypes = state.get('eventTypes').toJS();
  const filterStartDate = state.get('startDate');
  const filterEndDate = state.get('endDate');

  /* istanbul ignore next */
  function generateTag(list = [], selectedList = [], tagName = '') {
    let tag = '';
    let length = 0;
    /* istanbul ignore else */
    if (selectedList) {
      length = selectedList.length;
      if (length === 0) {
        tag = `All ${tagName}`;
      } /* istanbul ignore else */ else if (length === 1) {
        let selectedItem = null;
        for (let i = 0; i < list.length; i += 1) {
          if (list[i].id === selectedList[0]) {
            selectedItem = list[i];
            break;
          }
        }
        if (selectedItem && !isEmpty(selectedItem.name)) {
          tag = decodeHtmlStr(selectedItem.name);
        }
      } else {
        tag = `Multiple ${tagName}`;
      }
    }

    return tag;
  }

  function generateDateTag(startDate, endDate) {
    /* istanbul ignore else */
    if (!isEmpty(startDate) && !isEmpty(endDate)) {
      return `${startDate} to ${endDate}`;
    }

    if (!isEmpty(startDate)) {
      return `${startDate} to`;
    }

    if (!isEmpty(endDate)) {
      return `to ${endDate}`;
    }

    return null;
  }

  function getDefaultTags() {
    return [
      `All ${objCenters.label}`,
      `All ${objFacilityTypes.label}`,
      `All ${objEventTypes.label}`,
      `All ${objStatus.label}`
    ];
  }

  const tags = [];
  tags.push(generateTag(objCenters.data, objCenters.selected, objCenters.label));
  tags.push(generateTag(objFacilityTypes.data, objFacilityTypes.selected, objFacilityTypes.label));
  tags.push(generateTag(objEventTypes.data, objEventTypes.selected, objEventTypes.label));
  tags.push(generateTag(objStatus.data, objStatus.selected, objStatus.label));
  const dateTag = generateDateTag(filterStartDate, filterEndDate);
  if (!isEmpty(dateTag)) {
    tags.push(dateTag);
  }

  const isDefaultTags = isArrEqual(tags, getDefaultTags());

  return fromJS({
    currentTags: tags,
    isDefaultTags
  });
}

const getInitialState = (initState) => {
  const centersObj = normalizeData(initState.centers);
  const statusObj = normalizeData(initState.permitStatus);
  const facilityTypesObj = normalizeData(initState.facilityTypes);
  const eventTypesObj = normalizeData(initState.eventTypes);
  /* istanbul ignore next */
  const facilityWording = initState.facilityWording || '';

  const initialStateObject = {
    startDateObj: DEFAULT_DATE,
    endDateObj: DEFAULT_DATE,
    startDate: '',
    endDate: '',
    searchPlaceholder: 'Enter keyword to search...',
    searchData: {
      type: 'permit_number',
      value: ''
    },

    tags: {
      currentTags: [],
      isDefaultTags: false
    },

    centers: {
      label: 'centers',
      data: centersObj.data,
      selected: centersObj.selected,
      errMsg: ''
    },
    createdByMe: initState.createdByMe,
    status: {
      label: 'statuses',
      data: statusObj.data,
      selected: statusObj.selected
    },

    facilityTypes: {
      label: `${facilityWording.toLowerCase()} types`,
      data: facilityTypesObj.data,
      selected: facilityTypesObj.selected
    },

    eventTypes: {
      label: 'event types',
      data: eventTypesObj.data,
      selected: eventTypesObj.selected
    }
  };

  initialStateObject.tags = generateFilterTags(fromJS(initialStateObject));

  return fromJS(initialStateObject);
};


const handlers = {
  [CHANGE_START_DATE](state, {
    payload: {
      value,
      date
    }
  }) {
    return state.withMutations((s) => {
      s.set('startDateObj', date);
      s.set('startDate', value);

      s.set('tags', generateFilterTags(s));
    });
  },


  [CHANGE_END_DATE](state, {
    payload: {
      value,
      date
    }
  }) {
    // return state.set('endDate', value);
    return state.withMutations((s) => {
      s.set('endDateObj', date);
      s.set('endDate', value);

      s.set('tags', generateFilterTags(s));
    });
  },

  [UPDATE_SEARCH_VALUE](state, { payload }) {
    return state.set('searchData', fromJS(payload));
  },

  [CHANGE_CENTER](state, {
    payload: {
      value,
      errMsg
    }
  }) {
    return state.withMutations((s) => {
      s.setIn(['centers', 'selected'], fromJS(value));
      s.setIn(['centers', 'errMsg'], errMsg);
      s.set('tags', generateFilterTags(s));
    });
  },

  [CHANGE_FACILITY_TYPE](state, {
    payload: {
      value
    }
  }) {
    return state.withMutations((s) => {
      s.setIn(['facilityTypes', 'selected'], fromJS(value));

      s.set('tags', generateFilterTags(s));
    });
  },

  [CHANGE_STATUS](state, {
    payload: {
      value
    }
  }) {
    return state.withMutations((s) => {
      s.setIn(['status', 'selected'], fromJS(value));

      s.set('tags', generateFilterTags(s));
    });
  },

  [CHANGE_EVENT_TYPE](state, {
    payload: {
      value
    }
  }) {
    return state.withMutations((s) => {
      s.setIn(['eventTypes', 'selected'], fromJS(value));

      s.set('tags', generateFilterTags(s));
    });
  },

  [CHANGE_CREATE_BY_ME](state, { payload }) {
    return state.withMutations((s) => {
      s.set('createdByMe', payload);
    });
  },

  [CLEAR_ERRMSG](state) {
    return state.withMutations((s) => {
      s.setIn(['centers', 'errMsg'], '');
    });
  }
};

export default function getPermitFilterReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
