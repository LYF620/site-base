import type { DependencyList } from 'react'
import type { MutableRefObject } from 'react'

export type Data = { list: any[]; [key: string]: any }

export type Service<TData extends Data> = (
  currentData?: TData
) => Promise<TData>

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>

export interface InfiniteScrollOptions<TData extends Data> {
  target?: BasicTarget<Element | Document>
  isNoMore?: (data?: TData) => boolean
  threshold?: number
  manual?: boolean
  reloadDeps?: DependencyList
  onBefore?: () => void
  onSuccess?: (data: TData) => void
  onError?: (e: Error) => void
  onFinally?: (data?: TData, e?: Error) => void
}
