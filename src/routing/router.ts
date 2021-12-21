import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const routes = setupLayouts(generatedRoutes);

export const routerChecker = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  next();
};
