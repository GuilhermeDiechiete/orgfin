module.exports = {
    root: true,
    extends: ['@nuxt/eslint-config'],

    rules: {
      'space-before-function-paren': ['error', 'always'], // Para exigir espaço antes dos parênteses de função
      'space-before-blocks': ['error', 'always'], // Para exigir espaço antes de blocos (chaves)
      'semi': ['error', 'always'], // Para exigir ponto e vírgula no final de cada linha
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'never'
      }], // Para evitar quebras de linha antes do fechamento da tag
    }
  }
  