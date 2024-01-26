import { useRef } from 'react'

export type fnType = (...args: any[]) => any

export function usePresistFn<T extends fnType>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const presistFn = useRef<T>()
  if (!presistFn.current) {
    console.log('引用变啦')
    presistFn.current = function (...args) {
      return fnRef.current!.apply(this, args)
    } as T
  }

  return presistFn.current
}
