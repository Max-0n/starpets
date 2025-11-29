// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Starpets',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        { name: 'imagetoolbar', content: 'no' },
        { name: 'google', content: 'notranslate' },
        { name: 'theme-color', content: '#000000' },
        { name: 'cleartype', content: 'on' },
        { name: 'HandheldFriendly', content: 'True' },
      ],
    },
  },
  compatibilityDate: '2025-10-30',
  components: true,
  css: ['~/assets/styles/app.scss'],
  devServer: {
    // https: true,
    port: 3000,
  },
  devtools: { enabled: false },
  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: 'is-active',
        exactActiveClass: 'is-exact-active',
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    compilation: {
      strictMessage: false,
    },
  },
  imports: {
    dirs: ['./composables/**', './components/**', './types/**', './constants/**'],
  },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        prefetch: true,
        preconnect: true,
        display: 'swap',
        families: {
          Rubik: [300, 400, 500, 600, 700, 800, 900],
        },
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        strategy: 'no_prefix',
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales',
        detectBrowserLanguage: {
          alwaysRedirect: true,
          fallbackLocale: 'en',
          redirectOn: 'root',
          useCookie: true,
          cookieCrossOrigin: false,
          cookieDomain: null,
          cookieKey: 'i18n_redirected',
          cookieSecure: false,
        },
        locales: [
          {
            code: 'en',
            file: 'en.json',
            name: 'English',
          },
          {
            code: 'ru',
            file: 'ru.json',
            name: 'Русский',
          },
        ],
      },
    ],
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  ssr: false,
  typescript: {
    typeCheck: true,
    strict: true,
  },
  vite: {
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    plugins: [svgLoader()],
  },
})
