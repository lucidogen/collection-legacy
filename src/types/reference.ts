import { CollectionFieldType } from './'

export default function string
( name: string
, collection?: string
) : CollectionFieldType {
  return (
    { name: collection ? name : `${name}Ref`
    , type: 'reference'
    , collection: collection ? collection : name
    }
  )
}