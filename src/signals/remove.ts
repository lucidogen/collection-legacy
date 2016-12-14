import { CollectionPreType, SignalType } from '../'
import { input, set, state, when } from 'cerebral/operators'
import * as firebase from 'cerebral-provider-firebase'

export default function remove
( collection: CollectionPreType
) : SignalType {
  const { dynamicPaths, errorPath } = collection.paths
  return (
    [ ...dynamicPaths
    , set(input`filename`, state`${input`itemPath`}.imageName` )
    , firebase.remove(input`remoteItemPath` )
    , { success:
        [ when ( input`filename` )
        , { true:
            [ firebase.delete
              ( input`remoteItemImagePath`
              , input`filename`
              )
            , { success: []
              , error:
                [ set ( state`${errorPath}`, input`error` )
                ]
              }
            ]
          , false: []
          }
        ]
      , error:
        [ set ( state`${errorPath}`, input`error` )
        ]
      }
    ]
  )
}
