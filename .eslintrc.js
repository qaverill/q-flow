module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': [2, { ignore: ['@q'] }],
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src/packages'],
      },
    },
  },
};
