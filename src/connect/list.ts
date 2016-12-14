import { CollectionPreType, ConnectArgsType, ConnectHelperType } from '../'
import visibleKeys from '../computed/visibleKeys'

export default function connectList
( collection: CollectionPreType
) : ConnectHelperType {
  const { draftPath, filterPath } = collection.paths
  return function list
  ( extraProps: any = {}
  , extraSignals: any = {}
  ) : ConnectArgsType {
    return (
      [ Object.assign
        ( { filter: filterPath
          , visibleKeys: visibleKeys ( collection )
          , selectedKey: `${draftPath}.key`
          }
        , extraProps
        )
      , Object.assign
        ( { enterPressed: 'clients.filterEnterPressed'
          , onChange: 'clients.filterChanged'
          , onClick: 'clients.addClicked'
          }
        , extraSignals
        )
      ]
    )
  }
}
