export type ComponentsName = 'text' | 'select' | 'datePicker' | 'input'

export interface TableOptionsItem {
  title: string
  component: ComponentsName[]
  value: string | null | undefined
  id: string
}

export interface ValueOptionsItem {
  label: string
  value: ComponentsName
}

export interface LabelOptions {
  label: string
  value: string
}

export interface ComponentsOptions {
  type: 'text' | 'select' | 'datePicker' | 'input'
  name: string
  defaultValue: string
  options: LabelOptions[]
}

//  后端保存数据：{table,components}
export type ContextState = {
  // 渲染config => 对应的渲染信息
  table: TableOptionsItem[]
  // 组件库 => 配套组件库的props
  components?: ComponentsOptions[]
  titleOptions: LabelOptions[]
  valueOptions: ValueOptionsItem[]
}

export type Action = {
  type: string
  payload?: any
}

export type ContextType = {
  state: ContextState
  dispatch: (args: Action) => void
}
