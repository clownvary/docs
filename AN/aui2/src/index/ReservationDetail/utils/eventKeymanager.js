export function wrapEventIndex(eventIndex) {
  return `event_${eventIndex}`;
}

export function extractEventIndexWrapper(eventIndexWrapper) {
  return eventIndexWrapper.replace('event_', '');
}
