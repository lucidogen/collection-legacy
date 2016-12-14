import { CollectionPreType, SignalType } from '../'
import { input, set } from 'cerebral/operators'
import { set as setRemote } from 'cerebral-provider-firebase'
import timestampValue from './timestampValue'

export default function save
( collection: CollectionPreType
) : SignalType {
  const { dynamicPaths } = collection.paths
  return (
    // Expects input.key and input.value
    // Ensure value.key is properly set.
    [ set ( input`value.key`, input`key` )
    , ...timestampValue
    , ...dynamicPaths
    , setRemote ( input`remoteItemPath`, input`value` )
      // This chain must be followed by {success: [], error: []}
    ]
  )
}
