export const useTheme = () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  const watchCallback = (v) =>
    typeof document !== 'undefined' && document.documentElement.classList.toggle('dark', v);

  return {
    isDark,
    toggleDark,
    watchCallback,
  };
};
