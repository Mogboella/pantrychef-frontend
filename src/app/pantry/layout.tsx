"use client";

import HeaderBar from "@/components/HeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#735557] px-12 py-6">
            <HeaderBar />
            <div>
                {children}
            </div>
        </div>
    )
}