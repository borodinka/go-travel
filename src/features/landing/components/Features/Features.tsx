import { Stack } from "@mui/material";

import { APP_NAME } from "@config/constants";

import Dashboard from "../../assets/dashboard.jpg";
import Expenses from "../../assets/expenses.jpg";
import Divider from "../Divider";
import SectionTitle from "../SectionTitle";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <Stack mt={{ xs: 8.3, md: 13.5 }} textAlign="center">
      <SectionTitle
        title="Features"
        subtitle={`${APP_NAME} best solution for travel`}
      />
      <Stack gap={{ xs: 4, md: 9 }} mt={{ xs: 4, md: 8 }}>
        <FeatureCard
          imageSrc={Dashboard}
          feature="Dashboard"
          title="Organize All Your Trips in a Single Application"
          subtitle="With our intuitive application, you can effortlessly organize all your trips in one convenient location. From itinerary details and booking confirmations to travel notes and essential documents, everything you need for a smooth and stress-free journey is just a tap away. Enjoy a clutter-free travel experience and stay in control of your adventures with ease"
        />
        <Divider />
        <FeatureCard
          isReverse
          imageSrc={Expenses}
          feature="Expenses"
          title="Expense Tracking for Your Travels"
          subtitle="Keep a Close Watch on Your Travel Costs with our User-Friendly Expense Tracking Solution. Set budget goals, receive real-time updates, and make informed decisions to ensure you get the most out of your travel experiences without any financial surprises. Travel with confidence, knowing that your expenses are well-managed and under control"
        />
      </Stack>
    </Stack>
  );
}
