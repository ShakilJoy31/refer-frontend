// components/User/Dashboard/DashboardWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/User/Dashboard/DashboardComponent";
import DataLoader from "@/components/reusable-components/DataLoader";
import { getUserInfoFromToken } from "@/utils/helper/tokenHelper";

export default function DashboardWrapper() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const user = getUserInfoFromToken();

    useEffect(() => {
        if (!user?.id) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <DataLoader textToRender={'Authorizing User...'} />;
    } else {
        return <Dashboard />;
    }
}