module.exports = {
    root: true,
    extends: ['@nuxt/eslint-config'],

    rules: {
      'vue/max-attributes-per-line': ['error', {
        'singleline': 2,
        'multiline': {
          'max': 1, 
          'allowFirstLine': false 
        }
      }]
    }
  }
  