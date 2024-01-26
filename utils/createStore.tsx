import React, { createContext, useContext } from 'react'

export function createStore<T extends (...args: any) => any>(
  useExternalStore: T
) {
  const Context = createContext<ReturnType<T | any>>(null)
  function Provider({ children }: any) {
    const store = useExternalStore()
    return <Context.Provider value={store}>{children}</Context.Provider>
  }

  return {
    Provider,
    Context,
    useStore: function useStore() {
      return useContext<ReturnType<T>>(Context)
    },
  }
}
