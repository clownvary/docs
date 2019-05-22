export const SYNC_LEGACY_CUI = 'index/actions/legacyCui/SYNC_LEGACY_CUI';

/**
 * Provide this action to manually sync legacy cui session.
 * Generally, do this sync session work in legacyCuiMiddleware would be more
 * make sense, just apply for this action in some special cases such as:
 *    1. Entry new cui site forwarded from the legacy cui site.
 *    2. ...
 */
export function syncLegacyCuiAction() {
  return {
    type: SYNC_LEGACY_CUI
  };
}
