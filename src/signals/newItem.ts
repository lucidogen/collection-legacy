import { CollectionPreType, SignalType } from '../'
import { merge, set, state } from 'cerebral/operators'
import makeRef from '../operators/makeRef'
import paths from '../paths'

export default function newItem
( collection: CollectionPreType
) : SignalType {
  const { draftPath, filterPath } = collection.paths
  return (
    // Prepare initial item state
    [ set ( state`${draftPath}`, {} )
    , merge
      ( state`${draftPath}`
      , { key: makeRef
        , name: state`${filterPath}`
        }
      )
    ]
  )
}
