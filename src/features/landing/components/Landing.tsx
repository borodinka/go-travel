import { useRef } from "react";

import { Box, Stack } from "@mui/material";

import { theme } from "@config/styles";

import Advantages from "./Advantages/Advantages";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Hero from "./Hero/Hero";
import PlanNextTripSection from "./PlanNextTripSection";

export default function Landing() {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  const onButtonClick = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[100] }}>
      <Stack
        sx={{
          maxWidth: 1920,
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 12.5 },
        }}
      >
        <Header />
        <Hero onButtonClick={onButtonClick} />
        <Box ref={featuresRef}>
          <Features />
        </Box>
        <Advantages />
        <PlanNextTripSection />
        <Footer />
      </Stack>
    </Box>
  );
}
