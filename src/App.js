import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import GoogleMapReact from "google-map-react";

async function fetchNearest(coords, radius) {
  return await (
    await fetch(
      `http://192.168.1.11:5000/nearestAndCheapest/${coords}?radius=${radius}`
    )
  ).json();
}

const Marker = ({ text }) => (
  <div
    style={{
      padding: "0.1rem 20px",
      borderRadius: "0.5rem",
      background: "#0000ff",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#FFFFFF",
    }}
  >
    <p>{text}</p>
  </div>
);

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [nearestStation, setNearestStation] = useState(null);
  const [stations, setStations] = useState([]);
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useLayoutEffect(() => {
    //    if (!location.lat || !location.lng) return;

    fetchNearest(
      `${location.lat || "-32.0607997"},${location.lng || "115.9101534"}`,
      radius
    )
      .then((res) => {
        setStations(res.result || []);
        setNearestStation(res.nearest);
        console.log(res.nearest);
      })
      .catch((err) => {});
  }, [location, radius]);

  return (
    <div className="App">
      {true ? (
        nearestStation ? (
          <>
            <div className="nearest">
              <header>
                <h1>{nearestStation["trading-name"]}</h1>
                <p>
                  <span>{nearestStation.price}c</span>/litre
                </p>
              </header>
              <div
                style={{ height: "300px", width: "100%" }}
                className="map-preview"
              >
                <GoogleMapReact
                  zoom={17}
                  defaultCenter={{
                    lat: nearestStation.latitude,
                    lng: nearestStation.longitude,
                  }}
                  bootstrapURLKeys={{
                    key: "AIzaSyC0dKVItrG1Sr7cvnLSPfWiZWKxmcAfe68",
                  }}
                >
                  <Marker
                    lat={nearestStation.latitude}
                    lng={nearestStation.longitude}
                    text={`${nearestStation.price}c`}
                  ></Marker>
                </GoogleMapReact>
              </div>
            </div>
            <div className="stations">
              <h2>Next Cheapest in Your Area</h2>
              <section className="stations_container">
                {stations.map((station, key) => {
                  return (
                    <div key={key} className="station">
                      <header>
                        <h3>{station["trading-name"]}</h3>
                        <p>
                          <span>{station.price}c</span>/litre
                        </p>
                      </header>
                      <div className="address">
                        <p>
                          {station.address}, {station.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </>
        ) : (
          <div>Loading</div>
        )
      ) : (
        <div className="no-location">No location provided</div>
      )}
    </div>
  );
}

export default App;
