module.exports = {
    extends: 'airbnb',
    rules: {
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'max-len': ['error', 120],
      'react/static-property-placement': ['error', 'static public field'],
      'react/jsx-filename-extension': ['error', { "extensions": ['.js', '.ts'] }],
      'react/forbid-prop-types': ['off'],
      'react/prefer-stateless-function': ['off'],
      'react/jsx-props-no-spreading': ['off'],
      'react/jsx-one-expression-per-line': ['off'],
    }
};