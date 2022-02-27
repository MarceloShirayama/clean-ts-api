module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // '!<rootDir>/src/main/**',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/server.ts',
    '!<rootDir>/**/env.ts',
    '!<rootDir>/**/*protocols.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
