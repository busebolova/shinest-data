"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Modern Villa",
    location: "İstanbul, Türkiye",
    image: "/placeholder.svg?height=600&width=800&query=modern luxury villa interior with marble and gold accents",
    description: "Çağdaş tasarım anlayışıyla şekillendirilmiş lüks villa projesi",
  },
  {
    id: 2,
    title: "Penthouse Suite",
    location: "Dubai, UAE",
    image: "/placeholder.svg?height=600&width=800&query=luxury penthouse interior with panoramic city views",
    description: "Şehir manzaralı penthouse dairesinin iç mimari tasarımı",
  },
  {
    id: 3,
    title: "Boutique Hotel",
    location: "Paris, France",
    image: "/placeholder.svg?height=600&width=800&query=elegant boutique hotel lobby with classic French design",
    description: "Klasik Fransız mimarisiyle modern konforun buluştuğu otel projesi",
  },
  {
    id: 4,
    title: "Corporate Office",
    location: "London, UK",
    image: "/placeholder.svg?height=600&width=800&query=modern corporate office interior with sophisticated design",
    description: "Prestijli kurumsal ofis alanının tasarım ve uygulaması",
  },
]

export default function ProjectsSection() {
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
            Dünya çapında gerçekleştirdiğimiz prestijli projelerden seçkiler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl text-[#c4975a] group-hover:text-[#8b7355] transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-[#8b7355] uppercase tracking-wider">{project.location}</p>
                <p className="font-serif text-base text-[#8b7355] leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
