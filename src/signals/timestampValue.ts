import { CollectionPreType, SignalType } from '../'
export default 
[ function timestampValue
  ( { input: { value } }
  ) : any {
    return (
      { value: Object.assign
        ( {}
        , { created_at: { '.sv': 'timestamp' } }
        , value
        , { updated_at: { '.sv': 'timestamp' } }
        )
      }
    )
  }
]
