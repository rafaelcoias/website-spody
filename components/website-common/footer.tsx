import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#011936] text-white pt-12 pb-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <div className="mb-6 md:mb-0 flex md:flex-row flex-col gap-4 items-center">
                        <Image
                            src="/logo.png"
                            alt="Spody Logo"
                            width={120}
                            height={40}
                            className="h-8 w-auto brightness-0 invert"
                        />
                        <div className="ml-4">
                            <p className="text-gray-300">Study Smarter. Connect Deeper.</p>
                        </div>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <Link
                            href="https://www.instagram.com/spody.app?igsh=MWxwbm9sMXVldHdsNA=="
                            className="text-gray-300 hover:text-[#fea46b] transition-colors flex items-center space-x-2"
                        >
                            <Instagram className="h-5 w-5" />
                            <span>Instagram</span>
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} Spody. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

