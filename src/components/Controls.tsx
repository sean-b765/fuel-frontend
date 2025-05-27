import React from "react"
import { useStore } from "../state/state"
import { Card, CardContent, Grid, Slider, Typography } from "@mui/material"

type Props = {}

export const Controls = ({}: Props) => {
  const searchRadius = useStore((state) => state.searchRadius)
  const setSearchRadius = useStore((state) => state.setSearchRadius)

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid size={12}>
            <Typography
              variant="overline"
              fontWeight="600"
              sx={{ opacity: 0.75 }}
            >
              Controls
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container columns={12}>
              <Typography>Search Radius (km)</Typography>
              <Slider
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                value={searchRadius}
                onChange={(e, value) => setSearchRadius(value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
