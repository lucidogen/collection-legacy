import { v4 } from 'uuid'

export default function makeRef () {
  return { value: v4 () }
}
