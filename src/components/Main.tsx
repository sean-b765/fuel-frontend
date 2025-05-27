import { Box, Card, CardContent, Grid, Slider, Typography, useMediaQuery, useTheme } from "@mui/material"
import StationList from "./StationList"
import { Station } from "../types/station"
import Map from "./Map"

type Props = {
  stations: Station[],
  nearestStation: Station | null,
  radius: number,
  updateRadius: (r: number) => void
  setNearestStation: (s: Station) => void
}

export const Main = ({ stations, radius, nearestStation, updateRadius, setNearestStation }: Props) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid container columns={12} marginBottom={4}>
        <Grid size={12}>
          <Typography variant="overline" fontWeight={600}>Controls</Typography>
        </Grid>
        <Grid size={12}>
          <Grid container columns={12}>
            <Typography>Search Radius (km)</Typography>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={radius}
              onChange={(e, value) => updateRadius(value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid order={1} size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <StationList stations={stations} setNearestStation={setNearestStation} />
            </CardContent>
          </Card>
        </Grid>

        <Grid order={mobile ? 0 : 2} size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Map nearestStation={nearestStation} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
