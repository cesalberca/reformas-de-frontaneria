module.exports = {
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['./src/v8-mvc/**/*.{js,ts}', '!./src/v8-mvc/**/index.{js,ts}'],
}
