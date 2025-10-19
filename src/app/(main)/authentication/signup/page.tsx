import SignUpForm from "@/components/Authentication/SignupForm";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Refer | Signup",
    description: "Join our exclusive community. Create your account and start referring friends to earn amazing rewards.",
    keywords: [
      "signup", "create account", "referral program",
      "join community", "earn rewards", "exclusive access",
      "member registration", "refer friends", "premium benefits"
    ],
  });
}

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SignUpForm />
    </div>
  )
}

export default SignupPage;