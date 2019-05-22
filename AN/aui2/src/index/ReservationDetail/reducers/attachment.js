import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { FETCH_ATTACHMENTS, DELETE_ATTACHMENT } from '../consts/actionTypes';

const initialState = fromJS({
  attachedFiles: []
});

const handlers = {
  [FETCH_ATTACHMENTS](state, { payload: { body: { attached_files } } }) {
    return state.set('attachedFiles', fromJS(attached_files));
  },

  [DELETE_ATTACHMENT](state, { payload: id }) {
    return state.set('attachedFiles', state.get('attachedFiles').filter(item => item.get('uploadedfile_id') !== id));
  }
};

export default reducerHandler(initialState, handlers);
