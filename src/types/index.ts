export { default as string } from './string'
export { default as date } from './date'
export { default as reference } from './reference'

export type FieldType = 'string' | 'date' | 'reference'

export interface CollectionFieldType {
  name: string
  type: FieldType
  icon?: string
  // For references
  collection?: string
}