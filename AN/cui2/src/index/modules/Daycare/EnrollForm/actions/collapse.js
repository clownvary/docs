import createFSA from 'react-base-ui/lib/utils/createFSA';

import {
  SECTION_EXPAND_UI,
  MULTIPLE_SECTIONS_EXPAND_UI,
  SECTION_COLLAPSE_UI,
  SECTION_COLLAPSE_UI_RESET
} from '../consts/actionTypes';

const uiExpandSection = createFSA(SECTION_EXPAND_UI);
const uiExpandMultipleSections = createFSA(MULTIPLE_SECTIONS_EXPAND_UI);
const uiCollapseSection = createFSA(SECTION_COLLAPSE_UI);
const uiResetCollapseAction = createFSA(SECTION_COLLAPSE_UI_RESET);

export const expandSection = name => dispatch => dispatch(uiExpandSection({ name }));

export const expandMultipleSections = names => dispatch =>
  dispatch(uiExpandMultipleSections({ names }));

export const collapseSection = (name, disable = false) => dispatch =>
  dispatch(uiCollapseSection({ name, disable }));

export const resetCollapseSections = () => dispatch => dispatch(uiResetCollapseAction());
