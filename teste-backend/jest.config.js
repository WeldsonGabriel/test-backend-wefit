// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    // Remova esta linha se não precisar de um arquivo de setup
    // setupFiles: ['./jest.setup.js'],
    reporters: ['default', 'jest-html-reporter'],
  };
  