# cerebral-collection

Manage collections of items with Cerebral, Firebase and Inferno or React.

## For each collection create a settings file

```js
// collections/task.js
import Collection from 'cerebral-collection'
import { string, date, reference } from 'cerebral-collection/types'

export default Collection
( { name: 'task'
  , fields:
    [ string ( 'description' )
    , date ( 'date' )
    , reference ( 'project' ) // expects a 'project' collection as well
    ]
    // optional initial state
  , state: {}
    // optional sort function (default is by name)
  , sort: ( itemA, itemB ) => itemA.date > itemB.date ? 1 : -1
  }
)
```

Now you can access the collection helpers and settings from Cerebral module declaration, views, customized signals, etc.

### Cerebral controller

If you do not need to customize anything, you can directly use the collection like this:

```js
// controller.js
import taskCollection from './collections/task'
// ...

const controller = Controller
( { options: { strictRender: true }
  , state: {}
  , modules:
  { task: taskCollection.module
  }
, devtools: process.NODE_ENV === 'production' ? null : Devtools ()
  }
)
```

### Module definition

If you need to customize signals or simply add more elements to the module, you can use the collection
definition with Object.assign:

```js
// modules/task.js
import taskCollection from '../collections/task'

export default
{ state: Object.assign
  ( {}
  , taskCollection.state
  , { /* ... some more state */ }
  )
, signals: Object.assign
  ( {}
  , taskCollection.signals
  , { /* ... some other signals */ }
  )
}
```

### Signal chain reuse

To reuse a collection signal in a chain, simply grab it from the collection:

```js
// modules/task/signals/someSpecialSignal.js
import taskCollection from '../../../collections/task'

export default
[ ...taskCollection.signals.save
// etc
]
```

### Paths

The `paths` helper is in `taskCollection.paths`. This is used like this:

```js
// in a signal chain
import taskCollection from '../../../collections/task'
const { collectionPath, draftPath, dynamicPaths } = taskCollection.paths
// ...
export default
[ ...dynamicPaths // This sets dynamic paths in `input` such as itemPath, remoteItemPath, etc
// ...
]
```

### Views

You simply use component factories that understand the content of a collection (fields, types, etc). Here
is an idea for a form definition:

```js
// components/common/Form.js

import HeaderFactory from './Header'
import FieldFactory from './Field'

export default function FromFactory ( collection ) {
  const { draftPath } = collection.paths
  // Reuse a card header in the form
  const Header = HeaderFactory ( collection )
  // Input fields factory for the form
  const Field = FieldFactory ( collection )

  return connect
  ( { item: `${draftPath}.**`
    }
  , { discardClick: `${collection.name}.discardClicked`
    , saveClick: `${collection.name}.saveClicked`
    }
  , function Form ( { item, discardClick, saveClick } ) {
      return (
        <div className='card'>
          <div className='card-content'>
            <Header item={ item } />

            <nav className='level'>
              <div className='level-left' />
              <div className='level-right'>
                <div className='level-item'>
                  <p className='control'>
                    <a className='button' onClick={() => discardClick()}>
                      Discard
                    </a>
                  </p>
                </div>
                <div className='level-item'>
                  <p className='control'>
                    <a className='button is-primary' onClick={() => saveClick()}>
                      Save
                    </a>
                  </p>
                </div>
              </div>
            </nav>

            <div className='content'>
              { collection.fields.map
                ( field => (
                  <Field field={field} />
                ))
              }
            </div>
          </div>
        </div>
      )
    }
  )
}
```

You then use these factories directly from within a component:

```js
// components/Workspace.js
// shows a default list of items in a collection
import React from 'react'
import { connect } from 'cerebral/react'
import List from './common/List'
import Today from './Today'

const VIEWS =
{ Clients: List ( 'client' )
, Projects: List ( 'project' )
, Tasks: List ( 'task' )
, Today
}

export default connect
( { selectedView: 'app.$selectedView'
  }
, function Workspace ( { selectedView } ) {
    const CurrentView = VIEWS [ selectedView ]
    return (
      <div className='section'>
        <CurrentView />
      </div>
    )
  }
)
```

### Connect helper

For common props required in things like forms, list or items, you can
use the `collection.connect` helpers. These are (list, form, item).
Please refer to the files in `connect` for the details of what these
provide.

Using these helpers is entirely optional and the connection can be
created without if it makes the code easier to read and maintain.

```js
// components/common/List.js
export default function ListFactory ( collection ) {
  return connect
  ( ...collection.connect.list
    ( { t: translations } /* optional extra props */
    , {} /* optional extra signals */
    )
  , function List
    ( { filter, selectedKey, visibleKeys, t
      , enterPressed, onChange, onClick
      }
    ) {
      // ... Component implementation
    }
  )
}
```