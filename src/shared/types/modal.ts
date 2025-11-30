export type ModalAnimationType = 'fade' | 'slide-bottom'

export interface ModalItem {
  id: number
  component: any
  props?: Record<string, any>
  animation?: ModalAnimationType
  resolve: (data: any) => void
}
