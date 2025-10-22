// app/(main)/user/dashboard/page.tsx
import DashboardWrapper from "@/components/User/Dashboard/DashboardWrapper";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";


export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Dashboard | Refer",
    description: "Track your referrals, converted users, and earned credits in your dashboard.",
    keywords: [
      "dashboard", "referral program", "earn credits",
      "track referrals", "user analytics", "rewards tracking"
    ],
  });
}

const DashboardPage = () => {
  return <DashboardWrapper />;
}

export default DashboardPage;