import Collection from './index'
import { string, date, reference } from './types'

describe ( 'Collection.types', () => {
  it ( 'should create collection types from options', () => {
    expect
    ( Collection
      ( 'works'
        // this one is set by default: string ( 'name' )
      , [ string ( 'description' )
        , date ( 'date' )
        , reference ( 'project' )
        ]
      ).types
    )
    .toEqual
    ( ''
    )
  })
})