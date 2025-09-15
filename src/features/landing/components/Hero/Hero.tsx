import { motion } from "framer-motion";

import { Box, Stack, Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import { FontWeights } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import CityView from "../../assets/city-view.png";
import PalmTree from "../../assets/palm-tree.png";
import RVMobile from "../../assets/rv-mobile.png";
import RV from "../../assets/rv.png";
import Users from "../../assets/users.png";
import CtaButton from "../CtaButton";
import Divider from "../Divider";
import PlaneIcon from "./PlaneIcon";

interface Props {
  onButtonClick: () => void;
}

export default function Hero({ onButtonClick }: Props) {
  const { md, xl } = useBreakpoints();
  const heroTitle = "Your Ultimate Trip Companion".split(" ");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={5}
      mt={{ xs: 2, md: 4 }}
    >
      <Stack
        justifyContent="flex-end"
        position="relative"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: 668 },
          mb: { xs: 0, md: 4 },
        }}
      >
        {md ? (
          <Box
            sx={{
              position: "absolute",
              top: { md: -55, lg: 0 },
              left: { md: -300, lg: -100 },
            }}
          >
            <PlaneIcon />
          </Box>
        ) : (
          <img
            src={RVMobile}
            alt="Vintage RV"
            style={{
              objectFit: "cover",
              borderRadius: 24,
            }}
          />
        )}
        <Typography
          variant="h1"
          sx={{
            fontWeight: FontWeights.bold,
            fontSize: { xs: "2rem", md: "3.75rem" },
            lineHeight: { xs: "3rem", md: "4.375rem" },
            textAlign: { xs: "center", md: "start" },
            mb: 2,
            mt: 3,
          }}
        >
          {heroTitle.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: i / 7,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: FontWeights.regular,
            letterSpacing: 0.15,
            textAlign: { xs: "center", md: "start" },
            lineHeight: "1.875rem !important",
            mb: 5,
          }}
        >
          {`Welcome to ${APP_NAME} - Your Passport to Seamless Adventures! Discover, plan, and track your journeys effortlessly with our intuitive web application. `}
          {md && `Start exploring now!`}
        </Typography>
        <Stack direction="row" gap={2} mb={{ xs: 6, md: 19.5 }}>
          <CtaButton isHero />
          {md && (
            <AppButton fullWidth onClick={onButtonClick} variant="outlined">
              Learn More
            </AppButton>
          )}
        </Stack>
        <Stack gap={{ xs: 1.5, md: 2.5 }}>
          <Divider />
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={{ xs: 0, md: 2 }}
          >
            <Stack
              direction="row"
              justifyContent={!md ? "space-between" : ""}
              alignItems="center"
              width={{ xs: "100%", md: "fit-content" }}
              gap={2}
            >
              <Typography variant="h2" color="black">
                1200+ users
              </Typography>
              <img
                src={Users}
                alt="User avatars"
                style={{ width: !md ? 158 : 169 }}
              />
            </Stack>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              textAlign="start"
              alignSelf={!md ? "start" : ""}
            >
              Track their trips in {md && <br />} our App
            </Typography>
          </Stack>
          <Divider />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={3}
        sx={{
          display: md ? "flex" : "none",
          height: 926,
          width: { xl: 791 },
        }}
      >
        <Stack gap={3}>
          <img
            src={RV}
            alt="Vintage RV"
            style={{
              width: "100%",
              height: "calc(50% - 12px)",
              objectFit: "cover",
              borderRadius: 40,
            }}
          />
          <img
            src={PalmTree}
            alt="Palm tree"
            style={{
              width: "100%",
              height: "calc(50% - 12px)",
              objectFit: "cover",
              borderRadius: 40,
            }}
          />
        </Stack>
        {xl && (
          <img
            src={CityView}
            alt="City view"
            style={{
              objectFit: "cover",
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
