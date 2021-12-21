import { DEFAULT_LOCALE, SUPPORTED_LOCALES as locales } from '@/plugins/i18n';

export const useLocale = () => {
  const route = useRoute();
  const { messages } = useI18n();

  const toggleLocale = (newLocale: string) => {
    const _newLocale = locales[locales.indexOf(newLocale)];
    const base = _newLocale === DEFAULT_LOCALE ? '' : `/${_newLocale}`;

    window.location.pathname = base + route.fullPath;
  };

  // @ts-ignore
  const getCurrentLocale = computed(() => Object.keys(messages.value)[0]);

  return {
    toggleLocale,
    getCurrentLocale,
  };
};
