export function makeMarker(lat, lng, idx, refMarker = {}, icon = "/img/marker-ish.png") {
  return {
    id: `id${Math.random() * 1e4}`,
    idx: idx || refMarker.idx + 1 || 0,
    lat: lat || refMarker.lat || 54.710661,
    lng: lng || refMarker.lng || 25.286857,
    altitude: refMarker.altitude || 30,
    speed: refMarker.speed || "auto",
    heading: refMarker.heading || 0,
    icon,
    selected: false
  };
}
