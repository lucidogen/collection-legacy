import { CollectionPreType, SignalType } from '../'
import { input, set, state, when } from 'cerebral/operators'

export default function updatedKey
( collection: CollectionPreType
) : SignalType {
  const { draftPath, dynamicPaths } = collection.paths

  return (
    [ ...dynamicPaths
    , set ( state`${input`itemPath`}`, input`value` )
    , when
      ( state`${draftPath}.key`
      , input`key`
      , ( draftKey, updatedKey ) => draftKey === updatedKey
      )
    , { true:
        [ set ( state`${draftPath}`, input`value` )
        ]
      , false: []
      }
    ]
  )
}
