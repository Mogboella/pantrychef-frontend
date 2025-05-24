"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setShowBanner(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "true");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white px-6 py-4 flex justify-between items-center z-50">
            <p className="text-sm">
                🍪 This website uses cookies to improve your experience.
            </p>
            <button
                onClick={acceptCookies}
                className="ml-4 bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
                Accept
            </button>
        </div>
    );
}
