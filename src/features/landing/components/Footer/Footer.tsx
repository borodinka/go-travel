import InstagramIcon from "@mui/icons-material/Instagram";
import { Stack, Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import Logo from "@features/ui/logo/Logo";

import FacebookIcon from "./FacebookIcon";
import IconBox from "./IconBox";
import XIcon from "./XIcon";

export default function Footer() {
  return (
    <Stack alignItems="center" my={3}>
      <Logo isLanding isFooter />
      <Typography
        color="black"
        mt={2}
        sx={{
          fontSize: "1.125rem !important",
          lineHeight: "1.688rem !important",
        }}
      >
        Get in touch
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mt={0.5}
      >
        Contact us anytime for <br /> getting support
      </Typography>
      <Typography
        color="black"
        mt={4}
        sx={{
          fontSize: "1.125rem !important",
          lineHeight: "1.688rem !important",
        }}
      >
        contact@
        <b style={{ fontWeight: 500 }}>{`${APP_NAME.toLocaleLowerCase()}`}</b>
        .com
      </Typography>
      <Stack direction="row" gap={1} mt={1}>
        <IconBox Icon={<InstagramIcon sx={{ color: "primary.main" }} />} />
        <IconBox Icon={<FacebookIcon />} />
        <IconBox Icon={<XIcon />} />
      </Stack>
    </Stack>
  );
}
