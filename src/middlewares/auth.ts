import { defineMiddleware } from 'vite-ssr-middleware';

export default defineMiddleware('auth', ({ redirect, next, isClient, initialState, to }) => {
  // ------- EXAMPLE -------
  // const token = initialState?.cookies?.[`${ACCESS_TOKEN}`];
  //
  // if (token) {
  //   if (to.name === 'login') {
  //     redirect('/CURRENT_LOCALE/');
  //     return true;
  //   }
  //   return true;
  // }
  //
  // if (to.name !== 'login') {
  //   if (!isClient) {
  //     redirect('/CURRENT_LOCALE/login');
  //     next();
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  //
  // return false;
  console.log('auth middleware');
  return true;
});
