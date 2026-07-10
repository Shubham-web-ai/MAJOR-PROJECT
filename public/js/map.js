console.log(coordinates);

const map = new maplibregl.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
  center: coordinates,
  zoom: 10,
});

const marker = new maplibregl.Marker({color:"red"})
  .setLngLat(coordinates)
  .setPopup(new maplibregl.Popup({offset:25}).setHTML("<p>Exact Location will be provided after booking</p>"))
  .addTo(map);