

import EditProfile from "@/components/User/Profile/EditProfile";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "My Profile",
    description: "Track your referrals, converted users, and earned credits in your dashboard.",
    keywords: [
      "dashboard", "referral program", "earn credits",
      "track referrals", "user analytics", "rewards tracking"
    ],
  });
}

const ProfilePage = () => {
  return <EditProfile />;
}

export default ProfilePage;