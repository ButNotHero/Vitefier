import { onServerPrefetch } from 'vue-demi';

export const useSSR = async (callback): Promise<boolean> => {
  const isInit = ref(false);

  const init = async () => {
    try {
      await callback();
      isInit.value = true;
    } catch (e) {
      console.error(e);
      isInit.value = false;
    }
  };

  onServerPrefetch(async () => {
    await init();
  });

  onMounted(async () => {
    if (!isInit.value) await init();
  });

  return isInit.value;
};
