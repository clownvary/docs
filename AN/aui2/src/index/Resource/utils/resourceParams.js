export const getResourcesParams = (initialData, filters) => {
  const { permitID, batchID, receiptID, receiptEntryID, eventID } = initialData;
  const { centers, eventTypes, resourceTypes, facilityTypes } = filters;
  const params = {};

  params.site_ids = '';
  params.center_ids = centers.get('selected').join(',');
  params.event_type_ids = eventTypes.get('selected').join(',');
  params.resource_type_ids = resourceTypes.get('selected').join(',');
  params.facility_type_ids = facilityTypes.get('selected').join(',');

  params.permit_id = permitID;
  params.batch_id = batchID;
  params.receipt_id = receiptID;
  params.receipt_entry_id = receiptEntryID;

  if ((eventID && parseInt(eventID, 10) !== -1) || parseInt(receiptEntryID, 10) !== 0) {
    params.event_id = eventID;
    params.new_entry_id = receiptEntryID;
  }

  return params;
};

