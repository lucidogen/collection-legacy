import init from './signals/init'
import create from './signals/create'
import discardDraft from './signals/discardDraft'
import edit from './signals/edit'
import newItem from './signals/newItem'
import remove from './signals/remove'
import removed from './signals/removed'
import update from './signals/update'
import updated from './signals/updated'
import updateDraft from './signals/updateDraft'
import updateFilter from './signals/updateFilter'
import uploadProgress from './signals/uploadProgress'
import { CollectionFieldType } from './types'

type SignalType = any []

interface SignalsType {
  [ key: string ]: SignalType
}

export interface CollectionType {
  name: string
  types: CollectionFieldType []
  signals: SignalsType
}

export default function Collection
( name: string
, types: CollectionFieldType []
, initState?: any
) : CollectionType {
  return ( 
    { name
    , types
    , signals:
      { create: create ( name )
      , discardDraft: discardDraft ( name )
      , edit: edit ( name )
      , init: init ( name, initState )
      , newItem: newItem ( name )
      , update: update ( name )
      , updated: updated ( name )
      , remove: remove ( name )
      , removed: removed ( name )
      , updateFilter: updateFilter ( name )
      , updateDraft: updateDraft ( name )
      , uploadProgress: uploadProgress ( name )
      }
    }
  )
}
