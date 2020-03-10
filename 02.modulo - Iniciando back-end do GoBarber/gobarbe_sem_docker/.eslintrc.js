module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },  
  rules: {

    "prettier/prettier":  "error",

  // No eslint por padrão, todo metodo de uma class precisa usar this.
    "class-methods-use-this":  "off",

  // No eslint por padrão, não é possível receber parametros e fazer alterações
    "no-param-reassign" :  "off",

  // Por padrão o eslint não permite que variáveis sejá criada desta manéira variavel_impossible
    "camelcase":  "off",

  // Por padrão o eslint não permite declarar uma variável e não utiliza-la Ele vai ignorar a variavel next, caso eu chame ela como parametro e não use-a.

    "no-unused-vars": ["error", { "argsIgnorePattern":  "next" }],
  },
};
