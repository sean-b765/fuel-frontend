import "./App.css"
import { alpha, AppBar, Box, CssBaseline, LinearProgress, Stack } from "@mui/material"
import { Main } from "./components/Main"
import Header from "./components/Header"
import AppTheme from "./theme/AppTheme"
import { useCallback, useEffect, useState } from "react"
import { Coordinate } from "./types/util"
import { Station } from "./types/station"
import Emitter from "./services/eventemitter"
import { fetchNearest } from "./api/api"
import { FetchNearestResponse } from "./types/dto"
import { debounce } from 'lodash'

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

  const debouncedFetch = useCallback(
     debounce((lat: number, lng: number, rad: number) => {
      if (!lat || !lng) return

      fetchNearest(`${lat},${lng}`, radius).then(
        (res: FetchNearestResponse | Error) => {
          if (res instanceof Error) return
          
          setStations(res.Stations || [])
          setNearestStation(res.Stations[0])
        }
      )
    }, 750),
    []
  )

  useEffect(() => {
    if (location.lat && location.lng) debouncedFetch(location.lat, location.lng, radius)

    return () => {
      debouncedFetch.cancel()
    }
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
            <Main stations={stations} nearestStation={nearestStation} radius={radius} updateRadius={updateRadius} setNearestStation={setNearestStation} />
          </Stack>
        </Box>

        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
          {loading && <LinearProgress variant="indeterminate" />}
        </AppBar>
      </Box>
    </AppTheme>
  )
}

export default App
