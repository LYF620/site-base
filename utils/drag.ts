export const dragenter = (e) => {
  e.dataTransfer.dropEffect = 'move' // h5 的拖动图标
}

export const dragstart = (e, id, ref) => {
  console.log(e, ref.offsetWidth)

  // 阻止事件冒泡
  e.stopPropagation()
  e.dataTransfer.setData(
    'domID',
    JSON.stringify({
      id,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    })
  )
  e.target.addEventListener('drop', drop)
}

export const dragover = (e) => {
  e.preventDefault()
}

export const dragleave = (e) => {
  e.dataTransfer.dropEffect = 'none'
}

export const drop = (e, dispatch) => {
  const { id, width, height } = JSON.parse(e.dataTransfer.getData('domID'))
  e.stopPropagation()
  dispatch({
    type: 'addComponent',
    payload: {
      componentId: id,
      style: {
        top: e.nativeEvent.offsetY - height / 2,
        left: e.nativeEvent.offsetX - width / 2,
      },
    },
  })
}
