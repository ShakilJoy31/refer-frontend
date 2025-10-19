"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/reusable-components/Button";
import Heading from "@/components/reusable-components/Heading";
import Paragraph from "@/components/reusable-components/Paragraph";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4 mt-16 pt-[35px] mb-[269px]">
        <Button variant={'outline'}
          onClick={() => router.back()}
          className="flex text-sm text-cyan-500 hover:cursor-pointer hover:text-cyan-600"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center bg-white text-center mt-[188px]">
          <Heading className="text-6xl font-bold text-black mb-4">
            404 Not Found
          </Heading>
          <Paragraph className="text-gray-600 mb-6">
            Your visited page not found. You may go home page.
          </Paragraph>
          <Button
            onClick={() => router.push("/")}
            className="bg-cyan-500 text-white hover:cursor-pointer px-6 py-3 rounded-md hover:bg-cyan-600 transition-all"
          >
           Back to Home page
          </Button>
        </div>
      </div>
    </div>
  );
}