const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

const jestConfigWithOverrides = async (...args) => {
  const configFn = createJestConfig(customJestConfig);
  const nextJestConfig = await configFn(...args);

  nextJestConfig.moduleNameMapper = {
    // next/jest config has an existing rule that stubs images including SVGs
    // so as a workaround, we put our SVG stub higher up on the mapping tree
    // see https://github.com/vercel/next.js/discussions/58948 and https://github.com/vercel/next.js/discussions/42535
    '\\.svg$': '<rootDir>/__mocks__/svg.js',
    ...nextJestConfig.moduleNameMapper,
  };

  return nextJestConfig;
};

module.exports = jestConfigWithOverrides;
