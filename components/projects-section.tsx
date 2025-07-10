"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProjects = [
  {
    id: 1,
    title: "Modern Villa",
    category: "Residential",
    image: "/images/gallery-1.png",
    slug: "modern-villa",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    category: "Residential",
    image: "/images/gallery-2.png",
    slug: "luxury-apartment",
  },
  {
    id: 3,
    title: "Office Design",
    category: "Commercial",
    image: "/images/gallery-3.png",
    slug: "office-design",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#c4975a] mb-6">Projelerimiz</h2>
          <p className="font-serif text-lg text-[#8b7355] max-w-2xl mx-auto">
            Her projede benzersiz tasarım anlayışımızı ve kaliteli işçiliğimizi görebilirsiniz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    Detayları Gör
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#c4975a] font-medium">{project.category}</p>
                <h3 className="text-xl font-semibold text-[#15415b]">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/projects">
            <Button className="bg-[#c4975a] hover:bg-[#b8895a] text-white px-8 py-3">Tüm Projeleri Gör</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
