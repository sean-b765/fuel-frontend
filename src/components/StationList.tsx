import { Station } from "../types/station"
import { Chip, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip, Typography } from "@mui/material"

type Props = {
  stations: Station[]
  setNearestStation: (s: Station) => void
}

const StationList = ({ stations, setNearestStation }: Props) => {
  return (
    <Grid container>
      <Grid size={12}>
        <Typography variant="overline" fontWeight="600" sx={{ opacity: 0.75 }}>Stations</Typography>
      </Grid>
      <Grid size={12}>
        <List>
          {stations.map((station, key) => {
            return (
              <Tooltip key={key} followCursor title={`${station.Address} | ${station.Phone}`}>
                <ListItemButton onClick={() => setNearestStation(station)}>
                  <ListItemIcon>
                    <Chip size="small" label={`$${station.Price}`} sx={{ marginRight: '8px' }} />
                    <Chip size="small" label={`${Math.round(station.DistanceTo * 100) / 100}km`} sx={{ marginRight: '8px' }} />
                  </ListItemIcon>
                  <ListItemText>{station.TradingName} - {station.Location}</ListItemText>
                </ListItemButton>
              </Tooltip>
            )
          })}
        </List>
      </Grid>
    </Grid>
  )
}

export default StationList
