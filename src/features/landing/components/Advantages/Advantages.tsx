import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Stack } from "@mui/material";

import { Colors } from "@config/styles";

import SectionTitle from "../SectionTitle";
import AdvantageCard from "./AdvantageCard";
import CameraIcon from "./CameraIcon";
import FoldersIcon from "./FoldersIcon";

export default function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <Stack gap={{ xs: 1, md: 8 }} mt={{ xs: 6, md: 20 }} textAlign="center">
      <SectionTitle title="Advantages" subtitle="Why choose us?" />
      <Stack
        ref={ref}
        component={motion.div}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        transition={{ duration: 0.7 }}
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 3, md: 0, lg: 10.5 }}
        justifyContent="center"
      >
        <motion.div variants={item}>
          <AdvantageCard
            Icon={<CameraIcon />}
            title="Keep memories from the trip"
            subtitle="Keeping your travel photos within your trip-planning app is incredibly   practical"
          />
        </motion.div>
        <motion.div variants={item}>
          <AdvantageCard
            Icon={
              <PlaceOutlinedIcon
                sx={{
                  fontSize: 32,
                  color: "white",
                  stroke: Colors.primaryBlue,
                  strokeWidth: 0.5,
                }}
              />
            }
            title="Add places you want to visit"
            subtitle="Our user-friendly tools help you plan and organize your packing with ease"
          />
        </motion.div>
        <motion.div variants={item}>
          <AdvantageCard
            Icon={<FoldersIcon />}
            title="Centralize all your documents"
            subtitle="Simplify Your Life by Bringing Together All Your Essential Documents and Files in a Single, Easily Accessible Location"
          />
        </motion.div>
      </Stack>
    </Stack>
  );
}
