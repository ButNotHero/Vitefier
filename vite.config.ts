import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import Inspect from 'vite-plugin-inspect';
import viteSSR from 'vite-ssr/plugin';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2015',
    outDir: path.join(__dirname, '_app/dist'),
    assetsInlineLimit: 10000,
    sourcemap: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: `${path.resolve(__dirname, 'src')}/` }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/scss/mixins/index.scss";
        `,
        sourceMap: true,
      },
    },
  },
  plugins: [
    viteSSR(),

    Vue({
      include: [/\.vue$/],
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.startsWith('client') || tag.startsWith('Client'),
      //   },
      // },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      exclude: ['**/components/*.vue', '**/modules/*.ts'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'vue-i18n',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],

      directoryAsNamespace: true,

      // custom resolvers
      resolvers: [],

      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    exclude: ['vue-demi'],
  },
});
