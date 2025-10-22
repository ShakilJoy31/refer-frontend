
import Dashboard from "@/components/User/Dashboard/DashboardComponent";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Referral Dashboard",
    description: "Track your referrals, converted users, and earned credits in your dashboard.",
    keywords: [
      "dashboard", "referral program", "earn credits",
      "track referrals", "user analytics", "rewards tracking"
    ],
  });
}

const DashboardPage = () => {
  return <Dashboard />;
}

export default DashboardPage;
