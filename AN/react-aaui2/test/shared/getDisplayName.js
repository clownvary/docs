import getDisplayName from 'shared/getDisplayName'

it('should return the string if passing string as display name', () => {
  expect(getDisplayName('getDisplayName')).toBe('getDisplayName')
})

it('should return `undefined` if passing nothing', () => {
  expect(getDisplayName()).toBe(undefined)
})

it('should return `Component.displayName`', () => {
  expect(getDisplayName({ displayName: 'displayName' })).toBe('displayName')
})

it('should return `Component.name`', () => {
  expect(getDisplayName({ name: 'name' })).toBe('name')
})

it('should return Component string by default', () => {
  expect(getDisplayName({ NOT_FOUND: 'NOT_FOUND' })).toBe('Component')
})
