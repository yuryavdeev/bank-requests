module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Bank | Requests',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bank requests' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Subtract.svg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '@/node_modules/bootstrap/dist/css/bootstrap.min.css', // др. вариант подключения
    // '@/node_modules/bootstrap-vue/dist/bootstrap-vue.min.css',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/icons.js',
    '@/plugins/vee-validate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // bootstrapVue: { // - если импортировать руками
  //   bootstrapCSS: false,
  //   bootstrapVueCSS: false
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vee-validate'
    ],
  },

  env: {
    apiKey: process.env.VUE_APP_FB_KEY,
    baseUrl: process.env.VUE_APP_FB_URL_BASE
  },

  target: 'static',
  // - ниже для Гитхаба
  router: {
    base: '/bank-requests/'
  }
}
