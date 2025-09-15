import { motion } from "framer-motion";

import { Box, Stack, Typography } from "@mui/material";

import { Colors, FontWeights } from "@config/styles";

interface Props {
  Icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AdvantageCard({ Icon, title, subtitle }: Props) {
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <Stack
      component={motion.div}
      variants={item}
      py={{ xs: 3, md: 4 }}
      px={{ xs: 1, md: 4 }}
      width={{ xs: "100%", md: 446 }}
      alignItems="center"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          backgroundColor: Colors.primaryBlue,
          borderRadius: 1,
          mb: { xs: 2, md: 4 },
          WebkitBoxShadow: "-4px 3px 10px 0px rgba(0,0,0,0.25)",
          boxShadow: "-4px 3px 10px 0px rgba(0,0,0,0.25)",
        }}
      >
        {Icon}
      </Box>
      <Typography
        variant="h4"
        color="black"
        sx={{
          fontSize: { xs: "1.5rem", md: "1.563rem" },
          lineHeight: { xs: "2.25rem", md: "1.875rem" },
          mb: { xs: 1, md: 2 },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        fontWeight={FontWeights.regular}
        letterSpacing={0.15}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}
