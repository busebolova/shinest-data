"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Users, Clock, DollarSign, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useGitHubProject } from "@/hooks/use-github-projects"
import { Footer } from "@/components/footer"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { project, loading, error } = useGitHubProject(params.slug)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="aspect-video bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Proje bulunamadı veya yüklenirken bir hata oluştu.</p>
          <Link href="/projects">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Projelere Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/projects">
              <Button variant="ghost" className="mb-6 text-shinest-blue hover:text-shinest-blue/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Projelere Dön
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-shinest-blue/10 text-shinest-blue">
                {project.category}
              </Badge>
              <Badge
                variant="outline"
                className={`
                ${
                  project.status === "completed"
                    ? "border-green-500 text-green-700"
                    : project.status === "in-progress"
                      ? "border-yellow-500 text-yellow-700"
                      : "border-blue-500 text-blue-700"
                }
              `}
              >
                {project.status === "completed"
                  ? "Tamamlandı"
                  : project.status === "in-progress"
                    ? "Devam Ediyor"
                    : "Planlandı"}
              </Badge>
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-shinest-blue mb-4">{project.title}</h1>
            <p className="font-sans text-lg text-gray-600 max-w-3xl">{project.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={project.images[currentImageIndex] || "/placeholder.svg?height=600&width=800"}
              alt={`${project.title} - Görsel ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />

            {project.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-shinest-blue"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-shinest-blue"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Thumbnail Gallery */}
          {project.images.length > 1 && (
            <motion.div
              className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-shinest-blue shadow-lg"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
                  />
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-shinest-blue mb-6">Proje Detayları</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Calendar className="w-5 h-5 text-shinest-gold" />
                        <h3 className="font-medium text-shinest-blue">Tarih</h3>
                      </div>
                      <p className="text-gray-600">{project.year}</p>
                    </CardContent>
                  </Card>

                  {project.location && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <MapPin className="w-5 h-5 text-shinest-gold" />
                          <h3 className="font-medium text-shinest-blue">Konum</h3>
                        </div>
                        <p className="text-gray-600">{project.location}</p>
                      </CardContent>
                    </Card>
                  )}

                  {project.area && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-5 h-5 bg-shinest-gold rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">m²</span>
                          </div>
                          <h3 className="font-medium text-shinest-blue">Alan</h3>
                        </div>
                        <p className="text-gray-600">{project.area}</p>
                      </CardContent>
                    </Card>
                  )}

                  {project.duration && (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Clock className="w-5 h-5 text-shinest-gold" />
                          <h3 className="font-medium text-shinest-blue">Süre</h3>
                        </div>
                        <p className="text-gray-600">{project.duration}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {project.challenges && (
                      <div>
                        <h3 className="font-display text-xl text-shinest-blue mb-4">Zorluklar</h3>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.solutions && (
                      <div>
                        <h3 className="font-display text-xl text-shinest-blue mb-4">Çözümler</h3>
                        <ul className="space-y-2">
                          {project.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Results */}
              {project.results && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-display text-xl text-shinest-blue mb-4">Sonuçlar</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-shinest-gold rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-display text-lg text-shinest-blue mb-4">Etiketler</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Team */}
              {project.team && project.team.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-5 h-5 text-shinest-gold" />
                        <h3 className="font-display text-lg text-shinest-blue">Ekip</h3>
                      </div>
                      <ul className="space-y-2">
                        {project.team.map((member, index) => (
                          <li key={index} className="text-gray-600 text-sm">
                            {member}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Client & Budget */}
              {(project.client || project.budget) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 space-y-4">
                      {project.client && (
                        <div>
                          <h4 className="font-medium text-shinest-blue mb-2">Müşteri</h4>
                          <p className="text-gray-600 text-sm">{project.client}</p>
                        </div>
                      )}
                      {project.budget && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-4 h-4 text-shinest-gold" />
                            <h4 className="font-medium text-shinest-blue">Bütçe</h4>
                          </div>
                          <p className="text-gray-600 text-sm">{project.budget}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-shinest-blue to-shinest-blue/90 text-white">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-shinest-gold mb-4" />
                      <blockquote className="text-sm mb-4 italic">"{project.testimonial.text}"</blockquote>
                      <div className="text-xs">
                        <div className="font-medium">{project.testimonial.author}</div>
                        <div className="text-white/80">{project.testimonial.position}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
