import { CollectionPreType, ConnectHelpersType } from '../'
import form from './form'
import item from './item'
import list from './list'

export default function connect
( collection: CollectionPreType
) : ConnectHelpersType {
  return (
    { form: form ( collection )
    , item: item ( collection )
    , list: list ( collection )
    }
  )
}