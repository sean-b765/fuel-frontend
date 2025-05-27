import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import StationList from "./StationList"
import Map from "./Map"
import { useStore } from "../state/state"
import { Controls } from "./Controls"

type Props = {}

export const Main = ({}: Props) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  const selectedStation = useStore((state) => state.selectedStation)

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid container columns={12} spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controls />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent={!selectedStation ? "center" : "flex-start"}
        columns={12}
      >
        <Grid order={1} size={{ xs: 12, md: 6 }}>
          <StationList />
        </Grid>

        {selectedStation && (
          <Grid order={mobile ? 0 : 2} size={{ xs: 12, md: 6 }}>
            <Map />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
