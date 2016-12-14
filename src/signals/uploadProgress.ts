import { CollectionPreType, SignalType } from '../'
import { input, set, state } from 'cerebral/operators'

export default function uploadProgress
( collection: CollectionPreType
) : SignalType {
  const { dynamicPaths } = collection.paths

  return (
    [ ...dynamicPaths
    , set ( state`${input`itemPath`}.$imageProgress`, input`progress` )
    ]
  )
}
