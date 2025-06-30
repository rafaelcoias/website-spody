import { Navigation } from '@/components/navigation';
import { UserProvider } from '@/contexts/user-context';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Spody - Spot to Study",
    description: "A place to find spots to study and campus events. Study smarter, connect deeper.",
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    }
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <div className="min-h-screen bg-white">
                <Navigation />
                <main className="pb-16 md:pb-0">{children}</main>
            </div>
        </UserProvider>
    );
}