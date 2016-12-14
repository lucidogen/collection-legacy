import { CollectionPreType, SignalType } from '../'
import { state, unset } from 'cerebral/operators'

export default function discardDraft
( collection: CollectionPreType
) : SignalType {
  const { draftPath } = collection.paths
  return (
    [ unset ( state`${draftPath}.key` )
    , unset ( state`${draftPath}` )
    ]
  )
}
