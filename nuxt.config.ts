import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '#docs': resolve('./') },
  components: [
    {
      path: '#docs/components',
      prefix: 'Docs',
      pathPrefix: false
    }
  ],
  extends: [
    '@nuxt/ui-pro',
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-component-meta'
  ],
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
  },
  content: {
    highlight: {
      langs: [
        'postcss',
        'mdc'
      ]
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/api/search.json'
      ]
    }
  },
  routeRules: {
    '/components': { redirect: '/components/accordion', prerender: false },
    '/dev/components': { redirect: '/dev/components/accordion', prerender: false }
  },
  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/ui-templates',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      'nuxt-site-config',
      resolve('./components'),
      '.c12'
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: false,
      exposed: false
    }
  },
  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    'components:extend': (components) => {
      components.forEach((component) => {
        if (component.shortPath.includes('@nuxt/ui-pro')) {
          component.global = true
        } else if (component.global) {
          component.global = 'sync'
        }
      })
    }
  }
})
