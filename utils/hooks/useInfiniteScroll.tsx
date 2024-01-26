import {
  useEventListener,
  useMemoizedFn,
  useRequest,
  useUpdateEffect,
} from 'ahooks'
import { getTargetElement } from 'ahooks/lib/utils/domTarget'
import { useMemo, useState } from 'react'
import { getClientHeight, getScrollHeight, getScrollTop } from '../rect'
import { Data, InfiniteScrollOptions, Service } from './type'

const useInfiniteScroll = <TData extends Data>(
  service: Service<TData>,
  options: InfiniteScrollOptions<TData> = {}
) => {
  const {
    target,
    isNoMore,
    // 下拉自动加载，距离底部距离阈值
    threshold = 0,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options

  const [finalData, setFinalData] = useState<TData>()
  const [loadingMore, setLoadingMore] = useState(false)

  // 是否存在最后一页
  const noMore = useMemo(() => {
    if (!isNoMore) return false
    return isNoMore(finalData)
  }, [finalData])

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      console.log(lastData)

      const currentData = await service(lastData)
      if (!lastData) {
        setFinalData(currentData)
      } else {
        setFinalData({
          ...currentData,
          // @ts-ignore
          list: [...lastData.list, ...currentData.list],
        })
      }
      return currentData
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false)
        onFinally?.(d, e)
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        setTimeout(() => {
          scrollMethod()
        })
        onSuccess?.(d)
      },
      onError: (e) => onError?.(e),
    }
  )

  const loadMore = () => {
    if (noMore) return
    setLoadingMore(true)
    run(finalData)
  }

  const loadMoreAsync = () => {
    if (noMore) return
    setLoadingMore(true)
    return runAsync(finalData)
  }

  const reload = () => run()
  const reloadAsync = () => runAsync()

  const scrollMethod = () => {
    const el = getTargetElement(target)
    if (!el) {
      return
    }
    // Element.scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
    // Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数（即滚动距离）。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0。
    // clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.
    // 此属性会将获取的值四舍五入取整数。 如果你需要小数结果, 请使用 element.getBoundingClientRect().
    const scrollTop = getScrollTop(el)
    const scrollHeight = getScrollHeight(el)
    const clientHeight = getClientHeight(el)
    // scrollHeight - scrollTop 元素总高度 - 可滚动区域高度

    // clientHeight + threshold 可视区域的整高
    console.log(
      'scrollHeight',
      scrollHeight,
      'scrollTop',
      scrollTop,
      'clientHeight',
      clientHeight
    )
    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      console.log(scrollHeight - scrollTop, clientHeight + threshold, '触发')
      loadMore()
    }
  }

  // 监听滚动事件，触发滚动函数
  useEventListener(
    'scroll',
    () => {
      console.log('我再滚动')

      if (loading || loadingMore) {
        console.log('我没进去')

        return
      }
      scrollMethod()
    },
    { target }
  )

  useUpdateEffect(() => {
    run()
  }, [...reloadDeps])

  return {
    data: finalData,
    loading: !loadingMore && loading,
    loadingMore,
    noMore,

    loadMore: useMemoizedFn(loadMore),
    loadMoreAsync: useMemoizedFn(loadMoreAsync),
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel,
  }
}

export default useInfiniteScroll
