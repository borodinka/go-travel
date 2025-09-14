import { Stack, Typography } from "@mui/material";

import { FontWeights } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import CtaButton from "../CtaButton";

interface Props {
  imageSrc: string;
  feature: string;
  title: string;
  subtitle: string;
  isReverse?: boolean;
}

export default function FeatureCard({
  imageSrc,
  feature,
  title,
  subtitle,
  isReverse,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Stack
      direction={!md ? "column" : isReverse ? "row-reverse" : "row"}
      justifyContent="space-between"
      alignItems="center"
      gap={{ xs: 3, md: 5 }}
    >
      <img
        src={imageSrc}
        alt={`${feature} page`}
        style={{
          maxWidth: 810,
          width: md ? "50%" : "100%",
          borderRadius: 10,
          WebkitBoxShadow: "-14px 14px 38px 11px rgba(15,33,55,0.18)",
          boxShadow: "-14px 14px 38px 11px rgba(15,33,55,0.18)",
        }}
      />
      <Stack
        gap={{ xs: 2, md: 3 }}
        width={{ xs: "100%", md: 650 }}
        textAlign="start"
      >
        <Stack gap={1}>
          <Typography
            variant="h6"
            color="primary.main"
            lineHeight="1.5rem"
            sx={{ textTransform: "uppercase" }}
          >
            {feature}
          </Typography>
          <Typography
            variant="h4"
            color="black"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.188rem" },
              lineHeight: { xs: "2.25rem", md: "3.125rem" },
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          color="text.secondary"
          letterSpacing={0.15}
          sx={{ fontWeight: FontWeights.regular }}
        >
          {subtitle}
        </Typography>
        <CtaButton />
      </Stack>
    </Stack>
  );
}
