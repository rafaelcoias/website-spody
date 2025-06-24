"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll event to add shadow when scrolled
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <nav className={`fixed top-0 w-full bg-white/80 transition-all ${scrolled ? "shadow-md" : ""} backdrop-blur-md z-50 border-b border-gray-100`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Image src="/logo.png" alt="Spody Logo" width={120} height={40} className="h-8 w-auto" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <Button className="bg-[#fea46b] hover:bg-[#fea46b]/90 text-white cursor-pointer" onClick={() => scrollToSection("cta")}>
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            className="bg-[#fea46b] hover:bg-[#fea46b]/90 text-white text-sm px-4 cursor-pointer"
                            onClick={() => scrollToSection("cta")}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

