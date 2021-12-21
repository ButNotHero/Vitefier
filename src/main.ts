// register vue composition api globally
import { createHead } from '@vueuse/head';
import { viteSSR } from 'vite-ssr/vue';
import devalue from '@nuxt/devalue';
import mitt from 'mitt';
import { IncomingMessage } from 'http';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { middlewareHandler, Middleware } from 'vite-ssr-middleware';
import { routerChecker, routes } from '@/routing/router';
import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from '@/plugins/i18n';
import App from './App.vue';

// Windicss layers
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

// Custom styles
import './assets/styles/scss/index.scss';

// windicss devtools support (dev:spa only)
// import 'virtual:windi-devtools'

// @ts-ignore
const middlewareGlob = import.meta.globEager('./middlewares/*.ts');

const Options: Parameters<typeof viteSSR>['1'] = {
  routes,
  pageProps: {
    passToPage: false,
  },
  transformState(state) {
    // @ts-ignore
    return import.meta.env.SSR ? devalue(state) : state;
  },
  base: ({ url }) => {
    const locale = extractLocaleFromPath(url.pathname);
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
  },
};

export default viteSSR(App, Options, async (params) => {
  const { app, router, initialState, request, isClient, initialRoute } = params;

  // Cookie Parser
  if (!isClient) {
    const req = request as IncomingMessage;
    initialState.cookies = req.headers.cookie
      ?.split(';')
      .map((v) => {
        const cookiesplit = v.split('=');
        const cookieName = cookiesplit[0];
        const cookieValue = cookiesplit[1];

        return {
          [cookieName]: cookieValue,
        };
      })
      .reduce((acc, currentValue) => {
        for (const [key, name] of Object.entries(currentValue)) {
          acc[key] = name;
        }
        return acc;
      }, {});
  }

  // @ts-ignore
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) => i.install?.(params));

  const head = createHead();

  app.use(head);
  app.config.globalProperties.emitter = mitt();

  // @ts-ignore
  await installI18n(app, extractLocaleFromPath(initialRoute.href));

  const middlewares: Middleware[] = Object.keys(middlewareGlob).map(
    (key) => middlewareGlob[key].default,
  );

  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      routerChecker(to, from, next);
    },
  );

  router.beforeEach(middlewareHandler(params, middlewares));

  return {
    head,
  };
});
