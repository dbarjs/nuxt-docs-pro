import { createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {
  prefix?: string
}

export default defineNuxtModule({
  meta: {
    name: 'docs-pro',
    configKey: 'docsPro',
    compatibility: {
      nuxt: '^3.10.0'
    }
  },
  defaults: {
    prefix: 'Docs'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('runtime/components/content'),
      prefix: options.prefix,
      pathPrefix: false
    })

    // @ts-ignore
    nuxt.hook('tailwindcss:config', function (tailwindConfig) {
      tailwindConfig.content = tailwindConfig.content ?? { files: [] };
      (Array.isArray(tailwindConfig.content) ? tailwindConfig.content : tailwindConfig.content.files).push(resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'))
    })
  }
})
