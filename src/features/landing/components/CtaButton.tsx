import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  isHero?: boolean;
}

export default function CtaButton({ isHero }: Props) {
  const { md } = useBreakpoints();

  return (
    <AppButton
      LinkComponent={Link}
      href={AppRoutes.signUp}
      endIcon={<ArrowForwardIcon />}
      fullWidth={isHero ? true : !md}
      sx={{ px: isHero ? 0 : 6.6, height: 56 }}
    >
      Plan your trip
    </AppButton>
  );
}
