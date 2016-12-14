import { CollectionPreType, SignalType } from '../'
import newItem from './newItem'
import update from './update'

export default function create
( collection: CollectionPreType
) : SignalType {
  return (
    [ ...newItem ( collection )
    , ...update ( collection )
    ]
  )
}
