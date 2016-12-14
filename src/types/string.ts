import { CollectionFieldType } from './'

export default function string
( name: string
) : CollectionFieldType {
  return { name, type: 'string' }
}