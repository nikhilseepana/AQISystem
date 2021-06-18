import { useContext } from 'react';

export default function useStore<T>(storeContext: React.Context<T | null>) {
  const store = useContext(storeContext);

  if (!store) {
    throw new Error('StoreProvider was not set.');
  }

  return store;
}
