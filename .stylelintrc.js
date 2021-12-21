module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'no-empty-source': null,
    'scss/no-global-function-names': null,
    'scss/operator-no-newline-after': null,
    'function-url-quotes': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['/^/', 'deep'],
      },
    ],
  },
};
