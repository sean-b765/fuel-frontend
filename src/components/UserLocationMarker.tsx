import { Map, Marker } from "mapbox-gl"
import React, { useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { useStore } from "../state/state"
import Pin from "./Pin"

type Props = {
  map: Map | null
}

export default function UserLocationMarker({ map }: Props) {
  const userLocation = useStore((state) => state.userLocation)
  const userLocationMarkerRef = useRef<Marker | null>(null)

  useEffect(() => {
    if (map == null || userLocation == undefined) return

    const { lat, lng } = userLocation

    if (userLocationMarkerRef.current) {
      // Already have a marker, move the ref
      userLocationMarkerRef.current.setLngLat([lng, lat])
    } else {
      // Create a marker
      const element = document.createElement("div")
      const root = createRoot(element)
      root.render(<Pin color="#00d" />)

      userLocationMarkerRef.current = new Marker({
        element,
      })
        .setLngLat([lng, lat])
        .addTo(map)
    }
  }, [userLocation, map])

  // Cleanup
  useEffect(() => {
    return () => {
      if (!userLocationMarkerRef.current) return
      userLocationMarkerRef.current.remove()
      userLocationMarkerRef.current = null
    }
  }, [map])

  return <></>
}
