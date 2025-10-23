// app/register/page.tsx
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

// Accept searchParams from Next.js app router - make it async
const SignupPage = async ({ searchParams }: { searchParams?: Promise<{ r?: string }> }) => {
  // Await searchParams before using its properties
  const params = await searchParams;
  const referredBy = params?.r ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* pass referredBy to client component */}
      <RegisterForm initialReferredBy={referredBy} />
    </div>
  );
};

export default SignupPage;