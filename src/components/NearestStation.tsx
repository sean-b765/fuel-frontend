import React from "react"
// import GoogleMapReact from "google-map-react"
import { Station } from "../types/station"
import Marker from "./Marker"

type Props = {
  nearestStation: Station
}

const NearestStation = ({ nearestStation }: Props) => {
  if (nearestStation == null) return <></>
  return (
    <div>
      <header>
        <h1>{nearestStation.TradingName}</h1>
        <p className="mono price">{nearestStation.Price}</p>
        {nearestStation.JourneyTime && nearestStation.JourneyTime && (
          <p>
            {nearestStation.JourneyDistance}, ~{nearestStation.JourneyTime}
          </p>
        )}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${nearestStation.Address}, ${nearestStation.Location}`}
          target="_blank"
        >
          <svg
            strokeWidth="0"
            version="1.2"
            baseProfile="tiny"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.368 19.102c.349 1.049 1.011 1.086 1.478.086l5.309-11.375c.467-1.002.034-1.434-.967-.967l-11.376 5.308c-1.001.467-.963 1.129.085 1.479l4.103 1.367 1.368 4.102z"></path>
          </svg>
          {nearestStation.Address}, {nearestStation.Location}
        </a>
      </header>
      <div style={{ height: "300px", width: "100%" }} className="map-preview">
        {/* <GoogleMapReact
          zoom={17}
          defaultCenter={{
            lat: nearestStation.Latitude,
            lng: nearestStation.Longitude,
          }}
          center={{
            lat: nearestStation.Latitude,
            lng: nearestStation.Longitude,
          }}
          bootstrapURLKeys={{
          }}
        >
          <Marker
            // lat={nearestStation.Latitude}
            // lng={nearestStation.Longitude}
            text={`${nearestStation.Price}`}
          ></Marker>
        </GoogleMapReact> */}
      </div>
    </div>
  )
}

export default NearestStation
