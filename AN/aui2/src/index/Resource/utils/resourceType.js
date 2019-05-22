const {
  facilityTypeLabel,
  instructorLabel
} = window.__resourceCalender__.__initialState__;

export default function getResourceType(resourceType) {
  let resourceTypeName = '';

  switch (resourceType) {
    case 0:
      resourceTypeName = facilityTypeLabel;
      break;
    case 1:
      resourceTypeName = 'equipment';
      break;
    case 2:
      resourceTypeName = instructorLabel;
      break;
    default:
      resourceTypeName = '';
  }
  return resourceTypeName;
}
