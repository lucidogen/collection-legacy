import Collection from './index'
import { string, date, reference } from './types'

describe ( 'Collection', () => {
  it ( 'should create collection', () => {
    expect
    ( Object.keys
      ( Collection
        ( { name: 'works'
          // this one is set by default: string ( 'name' )
          , fields:
            [ string ( 'description' )
            , date ( 'date' )
            , reference ( 'project' )
            ]
          }
        )
      ).sort ()
    )
    .toEqual
    ( [ 'connect', 'fields', 'module', 'name', 'paths', 'signals', 'sort', 'state' ]
    )
  })
})

describe ( 'Collection.types', () => {
  it ( 'should create collection types from options', () => {
    expect
    ( Collection
      ( { name: 'works'
        // this one is set by default: string ( 'name' )
        , fields:
          [ string ( 'description' )
          , date ( 'date' )
          , reference ( 'project' )
          ]
        }
      ).fields
    )
    .toEqual
    ( [ { name: 'name', type: 'string' }
      , { name: 'description', type: 'string' }
      , { name: 'date', type: 'date' }
      , { name: 'projectRef', type: 'reference', collection: 'project' }
      ]
    )
  })
})

describe ( 'Collection.module', () => {
  it ( 'should create collection module for Cerebral', () => {
    expect
    ( Object.keys
      ( Collection
        ( { name: 'works'
            // this one is set by default: string ( 'name' )
          , fields:
            [ string ( 'description' )
            , date ( 'date' )
            , reference ( 'project' )
            ]
          }
        ).module
      ).sort ()
    )
    .toEqual
    ( [ 'signals', 'state' ]
    )
  })
})