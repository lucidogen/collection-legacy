import { CollectionPreType, ConnectArgsType, ConnectHelperType } from '../'

export default function connectForm
( collection: CollectionPreType
) : ConnectHelperType {
  const { draftPath, filterPath } = collection.paths
  return function form
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
