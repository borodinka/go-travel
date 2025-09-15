import { Box, Link, Stack } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";

export default function Header() {
  const { md } = useBreakpoints();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: { xs: 1, md: 2 },
      }}
    >
      <Logo isSmall={!md} isLanding />
      <Stack direction="row" gap={2.5}>
        <AppButton
          LinkComponent={Link}
          href={AppRoutes.login}
          variant="outlined"
          textVariant="subtitle2"
          sx={{ height: 48 }}
        >
          Log In
        </AppButton>
        <AppButton
          LinkComponent={Link}
          href={AppRoutes.signUp}
          textVariant="subtitle2"
          sx={{ display: !md ? "none" : "flex", height: 48 }}
        >
          Sign Up
        </AppButton>
      </Stack>
    </Box>
  );
}
