module.exports = {
    root: true,
    extends: ['@nuxt/eslint-config'],

    rules: {
      'semi': ['error', 'always'],
      'vue/first-attribute-linebreak': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
    },
};
  