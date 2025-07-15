"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Modern Villa",
    location: "İstanbul",
    image: "/images/project-kitchen.png",
    size: "large-vertical",
  },
  {
    id: 2,
    title: "Wooden Details",
    location: "Bodrum",
    image: "/images/project-patio.png",
    size: "large-horizontal",
  },
  {
    id: 3,
    title: "Minimal Bathroom",
    location: "Ankara",
    image: "/placeholder.svg?height=500&width=700",
    size: "medium",
  },
  {
    id: 4,
    title: "Luxury Apartment",
    location: "İzmir",
    image: "/placeholder.svg?height=600&width=400",
    size: "small-vertical",
  },
  {
    id: 5,
    title: "Office Space",
    location: "İstanbul",
    image: "/placeholder.svg?height=400&width=600",
    size: "small-horizontal",
  },
  {
    id: 6,
    title: "Hotel Lobby",
    location: "Antalya",
    image: "/placeholder.svg?height=500&width=500",
    size: "medium-square",
  },
]

export default function ProjectsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Sol büyük dikey görsel */}
          <motion.div
            className="col-span-12 md:col-span-5 lg:col-span-4 row-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative h-[70vh] md:h-[80vh]">
              <Image
                src={projects[0].image || "/placeholder.svg"}
                alt={projects[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-90">
                <h3 className="font-display text-xl text-[#8b7355]">{projects[0].title}</h3>
                <p className="font-sans text-sm text-[#8b7355]">{projects[0].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Orta büyük yatay görsel */}
          <motion.div
            className="col-span-12 md:col-span-7 lg:col-span-5 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[40vh]">
              <Image
                src={projects[1].image || "/placeholder.svg"}
                alt={projects[1].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-90">
                <h3 className="font-display text-xl text-[#8b7355]">{projects[1].title}</h3>
                <p className="font-sans text-sm text-[#8b7355]">{projects[1].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Sağ üst orta görsel */}
          <motion.div
            className="col-span-12 md:col-span-7 lg:col-span-3 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[40vh]">
              <Image
                src={projects[2].image || "/placeholder.svg"}
                alt={projects[2].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-90">
                <h3 className="font-display text-xl text-[#8b7355]">{projects[2].title}</h3>
                <p className="font-sans text-sm text-[#8b7355]">{projects[2].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Orta alt sol görsel */}
          <motion.div
            className="col-span-6 md:col-span-3 lg:col-span-2 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative h-[35vh]">
              <Image
                src={projects[3].image || "/placeholder.svg"}
                alt={projects[3].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-90">
                <h3 className="font-display text-lg text-[#8b7355]">{projects[3].title}</h3>
                <p className="font-sans text-xs text-[#8b7355]">{projects[3].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Orta alt orta görsel */}
          <motion.div
            className="col-span-6 md:col-span-4 lg:col-span-3 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative h-[35vh]">
              <Image
                src={projects[4].image || "/placeholder.svg"}
                alt={projects[4].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-90">
                <h3 className="font-display text-lg text-[#8b7355]">{projects[4].title}</h3>
                <p className="font-sans text-xs text-[#8b7355]">{projects[4].location}</p>
              </div>
            </div>
          </motion.div>

          {/* Sağ alt kategoriler */}
          <motion.div
            className="col-span-12 md:col-span-5 lg:col-span-3 row-span-1 bg-white flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="p-4 md:p-6">
              <div className="mb-8">
                <span className="text-[#c4975a] font-sans text-sm">»</span>
              </div>
              <nav className="space-y-4">
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  EV
                </Link>
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  STUDYO
                </Link>
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  SHINEST
                </Link>
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  İŞ
                </Link>
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  TEMAS ETMEK
                </Link>
                <Link
                  href="#"
                  className="block font-display text-xl text-[#8b7355] hover:text-[#c4975a] transition-colors"
                >
                  WEB MAGAZASI
                </Link>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
