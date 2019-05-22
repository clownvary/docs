module.exports = {
  bail: true,
  cacheDirectory: './node_modules/.cache',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '__mocks__',
    'a11y-test',
    '<rootDir>/test/polyfill.js',
    '<rootDir>/test/setup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testRegex: 'test/.*\\.jsx?$',
  moduleFileExtensions: ['', 'json', 'js', 'jsx', 'less'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|less|gif|jpg|jpeg|png)$': '<rootDir>/build/jestStyleMock.js',
    'react-tinymce': '<rootDir>/build/tinymceMock.js',
  },
  setupFiles: ['<rootDir>/test/polyfill.js', '<rootDir>/test/setup.js'],
}
