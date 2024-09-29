/**
 *
 * @param array any[]
 * @param track
 * @returns any[]
 *
 * takes in array with objects
 * and returns an a new array with only unique objects based place_id
 */
export const uniqueArrayPlaceIdObjectsOnly = (array, track = new Set()) =>
  array.filter(({ place_id }) =>
    track.has(place_id) ? false : track.add(place_id)
  );
