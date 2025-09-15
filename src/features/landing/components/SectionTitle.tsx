import { Stack, Typography } from "@mui/material";

import { FontWeights } from "@config/styles";

interface Props {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <Stack>
      <Typography
        variant="h6"
        color="primary.main"
        sx={{ textTransform: "uppercase", lineHeight: "2.188rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: FontWeights.semibold,
          fontSize: { xs: "1.625rem", md: "2.5rem" },
          lineHeight: { xs: "2.25rem", md: "4.375rem" },
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}
