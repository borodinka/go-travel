import { Stack, Typography } from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import DesktopCtaBackground from "../assets/cta-bg.jpg";
import MobileCtaBackground from "../assets/mobile-cta-bg.jpg";
import CtaButton from "./CtaButton";

export default function PlanNextTripSection() {
  const { md } = useBreakpoints();

  return (
    <Stack
      gap={4}
      alignItems="center"
      sx={{
        width: `calc(100% + ${md ? "12.5rem" : "2rem"})`,
        ml: { xs: -2, md: -12.5 },
        backgroundImage: `url(${
          md ? DesktopCtaBackground : MobileCtaBackground
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        mt: { xs: 4, md: 14.5 },
        py: { xs: 13, md: 15 },
        px: 2,
      }}
    >
      <Typography
        variant="h2"
        color="primary.main"
        sx={{
          fontSize: { xs: "1.875rem", md: "3.125rem" },
          lineHeight: { xs: "2.813rem", md: "3.438rem" },
          textAlign: "center",
        }}
      >
        Let's plan your next trip together?
      </Typography>
      <CtaButton />
    </Stack>
  );
}
