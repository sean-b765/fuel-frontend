import "./App.css"
import { alpha, Box, CssBaseline, Stack } from "@mui/material"
import { Main } from "./components/Main"
import Header from "./components/Header"
import AppTheme from "./theme/AppTheme"
import { useCallback, useEffect, useState } from "react"
import { Coordinate } from "./types/util"
import { Station } from "./types/station"
import Emitter from "./services/eventemitter"
import { fetchNearest } from "./api/api"
import { FetchNearestResponse } from "./types/dto"

function App() {
  const [location, setLocation] = useState<Partial<Coordinate>>({
    lat: undefined,
    lng: undefined,
  })
  const [nearestStation, setNearestStation] = useState<Station | null>(null)
  const [stations, setStations] = useState<Station[]>([])
  const [radius, setRadius] = useState<number>(5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      })
    }

    Emitter.on("AXIOS_START", () => {
      setLoading((state) => true)
    })
    Emitter.on("AXIOS_STOP", () => {
      setLoading((state) => false)
    })

    // cleanup
    return () => {}
  }, [])

  useEffect(() => {
    if (!location.lat || !location.lng) return

    fetchNearest(`${location.lat},${location.lng}`, radius).then(
      (res: FetchNearestResponse | Error) => {
        if (res instanceof Error) return
        
        setStations(res.Stations || [])
        setNearestStation(res.Stations[0])
      }
    )

    return () => {}
  }, [location, radius])

  const updateRadius = useCallback((r: number) => {
    if (r === 0) return
    setRadius(r)
  }, [])

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Main stations={stations} radius={radius} updateRadius={updateRadius} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  )
}

export default App
