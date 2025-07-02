"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=400&query=luxury interior design detail shot",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=400&query=modern furniture arrangement",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=400&query=elegant lighting design",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=400&query=luxury bathroom design",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=400&query=contemporary living room",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=400&width=400&query=designer kitchen interior",
  },
]

export default function InstagramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8 text-[#c4975a] mr-3" />
            <h2 className="font-display text-4xl md:text-5xl text-[#c4975a]">Instagram</h2>
          </div>
          <p className="font-serif text-lg text-[#8b7355] mb-8">
            Güncel projelerimizi ve tasarım ilhamlarımızı takip edin
          </p>
          <Button variant="outline" className="border-[#c4975a] text-[#c4975a] hover:bg-[#c4975a] hover:text-white">
            @shinest_interior
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
