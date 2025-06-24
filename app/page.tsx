"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Calendar, CheckCircle, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SpodyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    email: "",
    feature: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", university: "", email: "", feature: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/images/spody-logo.png" alt="Spody Logo" width={120} height={40} className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <Button className="bg-[#fea46b] hover:bg-[#fea46b]/90 text-white" onClick={() => scrollToSection("cta")}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                className="bg-[#fea46b] hover:bg-[#fea46b]/90 text-white text-sm px-4"
                onClick={() => scrollToSection("cta")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: heroY }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#011936] leading-tight mb-6">
                Study Smarter. <span className="text-[#fea46b]">Connect Deeper.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Find the perfect study spot and discover amazing campus events. Your ultimate student companion for
                academic success and social connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#fea46b] hover:bg-[#fea46b]/90 text-white px-8 py-4 text-lg font-semibold hover:shadow-lg hover:shadow-[#fea46b]/25 transition-all duration-300"
                  onClick={() => scrollToSection("cta")}
                >
                  Join the Beta
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/images/mockup1.png"
                  alt="Spody App Mockup"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-[#fea46b] rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#011936] rounded-full opacity-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-20 bg-gradient-to-br from-[#fea46b]/5 to-[#011936]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#011936] mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Your Spot to{" "}
              <motion.span
                className="text-[#fea46b] inline-block"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              >
                Study
              </motion.span>
            </motion.h2>

            <motion.div
              className="flex justify-center items-center space-x-8 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#fea46b] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#011936] mb-6">
              Everything You Need to Thrive
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover study spots, connect with peers, and never miss out on campus life again.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Spot Finder",
                description: "Filter by noise level, Wi-Fi strength, available outlets & reserve instantly",
                features: ["Live availability", "Noise level filters", "Amenity search", "Instant booking"],
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Live Busyness",
                description: "See who's checked in and how full each study spot is in real-time",
                features: ["Real-time occupancy", "Friend check-ins", "Crowd predictions", "Peak hour alerts"],
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: "Event Feed",
                description: "Browse, filter & RSVP to every campus event from parties to study groups",
                features: ["Unified event feed", "Smart filtering", "One-tap RSVP", "Calendar sync"],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3 group cursor-pointer">
                  <CardContent className="p-8">
                    <motion.div
                      className="flex items-center justify-center w-16 h-16 bg-[#fea46b]/10 rounded-2xl mb-6 group-hover:bg-[#fea46b]/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-[#fea46b] group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#011936] mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-[#fea46b] rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#011936] mb-6">
              Help Us Build the Ultimate <span className="text-[#fea46b]">Student Network</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join our beta community and shape the future of campus life. Your feedback drives our development.
            </p>

            <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12 text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
                      />
                    </div>
                    <div>
                      <Input
                        name="university"
                        placeholder="Your University"
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                        className="h-12 text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="feature"
                      placeholder="What feature do you want next? Tell us your ideas!"
                      value={formData.feature}
                      onChange={handleInputChange}
                      rows={4}
                      className="text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#fea46b] hover:bg-[#fea46b]/90 text-white px-12 py-4 text-lg font-semibold hover:shadow-lg hover:shadow-[#fea46b]/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join the Beta"}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#011936] mb-4">Thank You!</h3>
                  <p className="text-lg text-gray-600">
                    Welcome to the Spody community! We'll be in touch soon with beta access.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#011936] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <Image
                src="/images/spody-logo.png"
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
                href="#"
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
    </div>
  )
}
