interface IUseSSR {
  isInit: boolean;
  isError: boolean;
}

export const useSSR = (callback: () => void): IUseSSR => {
  const isInit = ref(false);
  const isError = ref(false);

  const init = async () => {
    try {
      isError.value = false;
      await callback();
      isInit.value = true;
    } catch (e) {
      console.error('useSSR callback error');
      console.error(e);
      isInit.value = false;
      isError.value = true;
    }
  };

  onServerPrefetch(async () => {
    await init();
  });

  onMounted(async () => {
    if (!isInit.value) await init();
  });

  return {
    isInit: isInit.value,
    isError: isError.value,
  };
};
