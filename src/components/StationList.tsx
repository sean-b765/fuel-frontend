import { Station } from "../types/station"
import { Chip, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from "@mui/material"

type Props = {
  stations: Station[]
}

const StationList = ({ stations }: Props) => {
  return (
    <List subheader={<ListSubheader>Stations</ListSubheader>}>
      {stations.map((station, key) => {
        return (
          <Tooltip key={key} title={`${station.Address} | ${station.Phone}`}>
            <ListItemButton>
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
  )
}

export default StationList
