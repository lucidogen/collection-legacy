import { CollectionPreType, SignalType } from '../'
import { input, set, state } from 'cerebral/operators'

export default function edit
( collection: CollectionPreType
) : SignalType {
  const { draftPath, dynamicPaths } = collection.paths
  return (
    [ ...dynamicPaths
    , set ( state`${draftPath}`, state`${input`itemPath`}` )
    , // To trigger change on collection list listening for
      // draft.key
      set ( state`${draftPath}.key`, input`key` )
    ]
  )
}
