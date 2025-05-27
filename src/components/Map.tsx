import { Grid, Typography } from "@mui/material"
import { Station } from "../types/station"

type Props = {
  nearestStation: Station | null
}

const Map = ({ nearestStation }: Props) => {
  return (
    <Grid container>
      <Grid size={12}>
        <Typography variant="overline" fontWeight={600} sx={{ opacity: 0.75 }}>
          {nearestStation ? nearestStation.TradingName : 'Map'}
        </Typography>
      </Grid>
      {nearestStation && (
        <Grid size={12}>
          {/* Price, distance */}
          <Grid size={12}>
            <Grid>
              
            </Grid>
          </Grid>
          {/* Details */}
          <Grid size={12}>
            <Typography variant="h5" component="h3">
              
            </Typography>
          </Grid>
          <Grid size={12}>MAP</Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Map
