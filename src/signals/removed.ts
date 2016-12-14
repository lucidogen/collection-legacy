import { CollectionPreType, SignalType } from '../'
import { input, state, unset } from 'cerebral/operators'
import paths from '../paths'

export default function removed
( collection: CollectionPreType
) : SignalType {
  const { dynamicPaths } = collection.paths
  return (
    [ ...dynamicPaths
    , unset ( state`${input`itemPath`}` )
    ]
  )
}
