export function target<E> (e:Event, t:E):E {
  if (e.target instanceof t) {
    // Now we know it's an <input />, with a `value` property.
    return e.target
  } else {
    throw new Error(`Expected Event target to be ${t} but found ${typeof e.target}`)
  }
}
