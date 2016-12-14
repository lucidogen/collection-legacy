export default function sort
( a: any
, b: any
) : number {
  return a.name <= b.name ? -1 : 1
}
