import { Box, Card, CardContent, Grid, Slider, Typography } from "@mui/material"
import StationList from "./StationList"
import { Station } from "../types/station"

type Props = {
  stations: Station[],
  radius: number,
  updateRadius: (r: number) => void
}

export const Main = ({ stations, radius, updateRadius }: Props) => {
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h6">
                <StationList stations={stations} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h6">
                Map
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
