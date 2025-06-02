import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material"
import ReactMapboxGL from "react-mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useStore } from "../state/state"
import React, { Ref, useEffect, useRef, useState } from "react"
import Pin from "./Pin"
import mapboxGl, { Map as MapboxGLMap, Layer, Marker } from "mapbox-gl"
import UserLocationMarker from "./UserLocationMarker"
import SelectedStationMarker from "./SelectedStationMarker"
import disabledPin from "../assets/disabled-pin.png"
import StationMarkers from "./StationMarkers"

mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Map = ({}) => {
  const mapRef = useRef<MapboxGLMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const selectedStation = useStore((state) => state.selectedStation)

  // Initialise the map
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return // initialized already, or no container available

    const map = new MapboxGLMap({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [115.86256114388702, -31.950664055777565],
      zoom: 12,
    })

    map.on("style.load", () => {
      mapRef.current = map

      // Register images
      mapRef.current.loadImage(disabledPin, (err, img) => {
        if (mapRef.current == null || err) return
        mapRef.current.addImage("disabled-pin", img as ImageBitmap)
      })
    })
  }, [])

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid size={12}>
            <Typography
              variant="overline"
              fontWeight={600}
              sx={{ opacity: 0.75 }}
            >
              {selectedStation ? selectedStation.TradingName : "Map"}
            </Typography>
          </Grid>
          <Grid mt={2} size={12}>
            <Grid size={12} height={300} sx={{ position: "relative" }}>
              <div
                ref={mapContainerRef}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <UserLocationMarker map={mapRef.current} />
                <SelectedStationMarker map={mapRef.current} />
                <StationMarkers map={mapRef.current} />
              </div>
            </Grid>
            {/* Price, distance */}
            {selectedStation && (
              <Grid size={12} my={2}>
                <Grid>
                  <Chip
                    size="small"
                    label={`$${selectedStation.Price}`}
                    sx={{ marginRight: "8px" }}
                  />
                  <Chip
                    size="small"
                    label={`${
                      Math.round(selectedStation.DistanceTo * 100) / 100
                    }km`}
                  />
                </Grid>
              </Grid>
            )}
            {/* Details */}
            {selectedStation && (
              <Grid size={12} mb={2}>
                {selectedStation.Address && (
                  <Typography variant="body2">
                    {selectedStation.Address}
                  </Typography>
                )}
                {selectedStation.Location && (
                  <Typography variant="body1">
                    {selectedStation.Location}
                  </Typography>
                )}
                {selectedStation.Phone && (
                  <Typography variant="overline">
                    {selectedStation.Phone}
                  </Typography>
                )}
                {(selectedStation.JourneyDistance ||
                  selectedStation.JourneyTime) && <Divider sx={{ my: 1 }} />}
                {selectedStation.JourneyTime && (
                  <Typography variant="body2">
                    {selectedStation.JourneyTime}
                  </Typography>
                )}
                {selectedStation.JourneyDistance && (
                  <Typography variant="body2">
                    {selectedStation.JourneyDistance}
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(Map)
