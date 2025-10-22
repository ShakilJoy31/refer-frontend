import LoginForm from "@/components/Authentication/LoginForm";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "Login | Refer",
    description: "Welcome back to your premium shopping experience. Access your account to continue shopping and managing your referrals.",
    keywords: [
      "login", "sign in", "account access",
      "secure login", "member portal", "shopping account",
      "user login", "secure authentication", "premium access"
    ],
  });
}

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <LoginForm />
    </div>
  )
}

export default LoginPage;