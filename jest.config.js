module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@main-layout/(.*)$': '<rootDir>/src/app/main-layout/$1',
    '^@auth-layout/(.*)$': '<rootDir>/src/app/auth-layout/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};