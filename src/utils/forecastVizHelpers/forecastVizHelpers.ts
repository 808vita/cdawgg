export const uniqueArrayPlaceIdObjectsOnly = (array, track = new Set()) =>
  array.filter(({ place_id }) =>
    track.has(place_id) ? false : track.add(place_id)
  );
