export const useEmitter = () => {
  const internalInstance: any = getCurrentInstance();
  const { emitter } = internalInstance.appContext.config.globalProperties;

  return emitter;
};

interface TEvent {
  [key: string]: string;
}

export const events: TEvent = {
  eventName: 'someEventId',
};
