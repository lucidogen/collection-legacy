import { CollectionPreType, SignalType } from '../'
import { input, set, state } from 'cerebral/operators'

export default function updateFilter
( collection: CollectionPreType
) : SignalType {
  const { filterPath } = collection.paths
  return (
    [ set ( state`${filterPath}`, input`value` )
    ]
  )
}
