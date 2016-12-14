import { CollectionPreType, SignalType } from '../'
import { input, set, state, when } from 'cerebral/operators'

const MAX_IMAGE_KB = 100

const validateNewValue = ( key, value ) => (
  ( key !== '$imageFile' || value.size <= MAX_IMAGE_KB * 1024 )
)

export default function updateDraft
( collection: CollectionPreType
) : SignalType {
  const { draftPath, errorPath } = collection.paths
  return (
    [ when
      ( input`key`
      , input`value`
      , validateNewValue
      )
    , { true:
        [ set ( state`${draftPath}.${input`key`}`, input`value` )
        ]
      , false:
        [ set ( state`${errorPath}`, `Image exceeds maximum size of ${MAX_IMAGE_KB} KB` )
        ]
      }
    ]
  )
}
