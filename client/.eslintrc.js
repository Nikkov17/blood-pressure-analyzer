module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  plugins: [
    'eslint-plugin-class-property'
  ],
  rules: {
    'linebreak-style': 'off', // disable linebreak diff for windows/unix
    'no-var': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'warn',
    'comma-dangle': 'off', // ['error', 'never'], // temporary
    'no-underscore-dangle': 'off',
    'no-use-before-define': ['error', {
      functions: false,
      classes: true
    }],
    'class-methods-use-this': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-duplicates': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off', // temporary

    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': ['warn', { forbid: ['any'] }],
    'react/require-default-props': 'off',
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }], // temporary

    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'to', 'hrefLeft', 'hrefRight' ],
      'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
    }],
    "jsx-a11y/label-has-for": [ 'error', {
      "components": [ "label" ],
      "required": {
        "some": [ "nesting", "id" ]
      },
      "allowChildren": true
    }],
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/sort-comp': 'off'
  }
};
