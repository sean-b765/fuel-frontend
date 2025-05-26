import { Stack, Typography } from "@mui/material"

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 1 }}>
        <Typography component="h1" variant="h3">Perth Fuel</Typography>
      </Stack>
    </Stack>
  )
}
