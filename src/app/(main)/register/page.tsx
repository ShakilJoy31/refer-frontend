// app/register/page.tsx (or wherever your SignupPage is)
import RegisterForm from "@/components/Authentication/RegisterForm";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Signup | Refer",
    description: "Join our exclusive community. Create your account and start referring friends to earn amazing rewards.",
    keywords: [
      "signup", "create account", "referral program",
      "join community", "earn rewards", "exclusive access",
      "member registration", "refer friends", "premium benefits"
    ]
  });
}

// Accept searchParams from Next.js app router
const SignupPage = ({ searchParams }: { searchParams?: { r?: string } }) => {
  // Grab referral from search params (if present)
  const referredBy = searchParams?.r ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* pass referredBy to client component */}
      <RegisterForm initialReferredBy={referredBy} />
    </div>
  );
};

export default SignupPage;
