import { CollectionPreType, ConnectArgsType, ConnectHelperType } from '../'

export default function connectItem
( collection: CollectionPreType
) : ConnectHelperType {
  const { draftPath, filterPath } = collection.paths
  return function item
  ( extraProps: any = {}
  , extraSignals: any = {}
  ) : ConnectArgsType {
    return (
      [ Object.assign
        ( { // TODO
          }
        , extraProps
        )
      , Object.assign
        ( { // TODO
          }
        , extraSignals
        )
      ]
    )
  }
}
