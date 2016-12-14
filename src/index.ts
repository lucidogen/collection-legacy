import init from './signals/init'
import connect from './connect'
import create from './signals/create'
import discardDraft from './signals/discardDraft'
import edit from './signals/edit'
import newItem from './signals/newItem'
import paths from './paths'
import remove from './signals/remove'
import removed from './signals/removed'
import sort from './sort'
import update from './signals/update'
import updated from './signals/updated'
import updateDraft from './signals/updateDraft'
import updateFilter from './signals/updateFilter'
import uploadProgress from './signals/uploadProgress'
import { CollectionFieldType, string } from './types'

interface ActionType {
  ( context: any ): void | any
}

export type SignalType = ActionType []

interface SignalsType {
  [ key: string ]: SignalType
}

export interface PathsType {
  collectionPath: string
  draftPath: string
  filterPath: string
  errorPath: string
  dynamicPaths: SignalType
}

export interface SortFunctionType {
  ( a: any, b: any ) : number
}

export interface CollectionPreType {
  name: string
  fields: CollectionFieldType []
  paths: PathsType
  sort: SortFunctionType
  state: any
}

export type ConnectArgsType = [ any, any ]

export interface ConnectHelperType {
  () : ConnectArgsType
  ( extraProps: any ) : ConnectArgsType
  ( extraProps: any, extraSignals: any ) : ConnectArgsType
}

export interface ConnectHelpersType {
  list: ConnectHelperType
  item: ConnectHelperType
  form: ConnectHelperType
}

export interface CollectionType extends CollectionPreType {
  module: { state: any, signals: SignalsType }
  signals: SignalsType
  connect: ConnectHelpersType
}

export interface CollectionDefinitionType {
  name: string
  fields: CollectionFieldType []
  paths?: ( definition: CollectionDefinitionType ) => PathsType
  sort?: SortFunctionType
  state?: any
}

const NAME_FIELD = string ( 'name' )

export default function Collection
( definition: CollectionDefinitionType
) : CollectionType {
  const collection = Object.assign
  ( { state: {}
    , sort
    }
  , definition
  , { fields: [ NAME_FIELD ].concat ( definition.fields )
    , paths: definition.paths
             ? definition.paths ( definition )
             : paths ( definition )
    }
  )

  const signals =
  { create: create ( collection )
  , discardDraft: discardDraft ( collection )
  , edit: edit ( collection )
  , init: init ( collection )
  , newItem: newItem ( collection )
  , update: update ( collection )
  , updated: updated ( collection )
  , remove: remove ( collection )
  , removed: removed ( collection )
  , updateFilter: updateFilter ( collection )
  , updateDraft: updateDraft ( collection )
  , uploadProgress: uploadProgress ( collection )
  }

  return Object.assign
  ( {}
  , collection
  , { signals 
    , module: { state: collection.state, signals }
    , connect: connect ( collection )
    }
  )
}
