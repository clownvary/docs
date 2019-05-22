export const FEE_SUMMARY = 'FEE_SUMMARY';

export function updateFeeSummary(feeSummary) {
  return {
    type: FEE_SUMMARY,
    payload: {
      feeSummary
    }
  };
}
