import Footer from '@/components/website-common/footer';
import Navbar from '@/components/website-common/navbar';
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
        <div className='overflow-x-hidden'>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}