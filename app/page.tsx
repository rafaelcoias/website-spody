"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Calendar, CheckCircle, Instagram } from "lucide-react"
import Image from "next/image"

export default function SpodyLanding() {
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

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          uni: formData.university,
          email: formData.email,
          message: formData.feature,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit data")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your form. Please try again later.")
      setIsSubmitting(false)
      return
    }

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
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
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
              <p className="sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Find the perfect study spot and discover amazing campus events. Your ultimate student companion for
                academic success and social connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#fea46b] cursor-pointer hover:bg-[#fea46b]/90 text-white px-8 py-4 sm:text-lg font-semibold hover:shadow-lg hover:shadow-[#fea46b]/25 transition-all duration-300"
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
                  src="/mockup.png"
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
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.8, 1, 0.8],
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#011936] mb-6 text-balance">
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
                features: ["Find nearby spots", "Live availability", "Features search and filters"],
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
                description: "Browse and filter to every campus event from parties, study groups and clubs",
                features: ["Unified event feed", "Smart filtering", "Friend sharing"],
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#011936] mb-6 text-balance">
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
                        className="h-12 sm:text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
                      />
                    </div>
                    <div>
                      <Input
                        name="university"
                        placeholder="Your University"
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                        className="h-12 sm:text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
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
                      className="h-12 sm:text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b]"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="feature"
                      placeholder="What feature do you want next? Tell us your ideas!"
                      value={formData.feature}
                      onChange={handleInputChange}
                      rows={4}
                      className="sm:text-lg border-gray-200 focus:border-[#fea46b] focus:ring-[#fea46b] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#fea46b] hover:bg-[#fea46b]/90 text-white px-12 py-4 sm:text-lg font-semibold hover:shadow-lg hover:shadow-[#fea46b]/25 transition-all duration-300 disabled:opacity-50"
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
    </div>
  )
}
