import {input, set, state, string, when} from 'cerebral/operators'
import { CollectionDefinitionType, PathsType } from './'

export default function paths
( { name }: CollectionDefinitionType
) : PathsType {
  return (
    { collectionPath: `${name}.all`
    , draftPath: `${name}.$draft`
    , filterPath: `${name}.$filter`
    , errorPath: `app.$error`
    , dynamicPaths:
      [ set
        ( input`remoteCollectionPath`
        , string`${state`user.$currentUser.uid`}.${name}`
        )
      , when ( input`key` )
      , { true:
          [ set
            ( input`itemPath`
            , string`${name}.all.${input`key`}`
            )
          , set
            ( input`remoteItemPath`
            , string`${input`remoteCollectionPath`}.${input`key`}`
            )
          , set
            ( input`remoteItemImagePath`
            , string`${input`remoteItemPath`}.image`
            )
          ]
        , false: []
        }
      ]
    }
  )
}
