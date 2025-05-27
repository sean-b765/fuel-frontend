import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material"
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useStore } from "../state/state"
import React from "react"

// TODO this will load each time selectedStation changes, eating up my API key usage quota
//  It should load ONCE only. Any subsequent changes to selectedStation should animate the map to the next station
const Map = ({}) => {
  const Mapbox = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic2VhbmIwMTUzIiwiYSI6ImNtYjYzZHI2MjBoOGkyanFzeGdhcm0xYXMifQ.VDYysO0qDb5wBACX7zWH2A",
  })

  const selectedStation = useStore((state) => state.selectedStation)

  if (!selectedStation) return <></>

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
          {selectedStation && (
            <Grid mt={2} size={12}>
              <Grid size={12} minHeight={300} sx={{ position: "relative" }}>
                <Mapbox
                  style="mapbox://styles/mapbox/streets-v9"
                  containerStyle={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                  center={[Number(selectedStation.Longitude), Number(selectedStation.Latitude)]}
                ></Mapbox>
              </Grid>
              {/* Price, distance */}
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
              {/* Details */}
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
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(Map)
