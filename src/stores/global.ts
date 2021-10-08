import { createStore, BuilderStore } from 'nanostores'

export interface IStoreGlobal {
  token?: string;
  token_refresh?: string;
  auth_status: boolean;
  loading: boolean;
  loading_duration: number;
}

export const StoreGlobal = createStore<IStoreGlobal>(() => {
  StoreGlobal.set({
    auth_status: false,
    loading: true,
    loading_duration: 0
  })
  return () => {
    // destructor: unsubscribe from all events
  }
})