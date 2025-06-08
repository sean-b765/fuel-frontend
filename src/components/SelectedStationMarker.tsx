import { Map, Marker } from "mapbox-gl"
import React, { useEffect, useRef } from "react"
import { useStore } from "../state/state"
import { createRoot } from "react-dom/client"
import Pin from "./Pin"

type Props = {
  map: Map | null
}

export default function SelectedStationMarker({ map }: Props) {
  const selectedStation = useStore((state) => state.selectedStation)
  const selectedStationMarkerRef = useRef<Marker | null>(null)

  useEffect(() => {
    if (selectedStation == undefined) {
      selectedStationMarkerRef.current = null
      return
    }
    if (map == null) return

    const lat = Number(selectedStation.Latitude)
    const lng = Number(selectedStation.Longitude)

    // Ensure the map is resized to the parent container
    map.resize()

    if (selectedStationMarkerRef.current) {
      // Move to new latlng
      selectedStationMarkerRef.current.setLngLat([lng, lat])
      // Also focus the map to the marker
      map.flyTo({ center: [lng, lat], zoom: 12 })
    } else {
      // Create the marker
      const element = document.createElement("div")
      const root = createRoot(element)
      root.render(<Pin />)

      selectedStationMarkerRef.current = new Marker({
        element,
      })
        .setLngLat([lng, lat])
        .addTo(map)
    }
  }, [selectedStation])

  // Cleanup
  useEffect(() => {
    return () => {
      if (selectedStationMarkerRef.current == null) return
      selectedStationMarkerRef.current.remove()
      selectedStationMarkerRef.current = null
    }
  }, [])

  return <></>
}
