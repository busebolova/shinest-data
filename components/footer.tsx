"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { content, isMounted } = useLanguage()

  if (!isMounted) {
    return (
      <footer className="bg-[#15415b] text-white" style={{ fontFamily: "var(--font-poppins)" }}>
        <div className="container mx-auto px-4 py-16">
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">&nbsp;</p>
          </div>
        </div>
      </footer>
    )
  }

  const footerContent = content.footer

  return (
    <footer className="bg-[#15415b] text-white" style={{ fontFamily: "var(--font-poppins)" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image src="/images/shinest-logo.png" alt="SHINEST Logo" fill className="object-contain" />
              </div>
              <h3 className="font-bold text-xl">{footerContent.company}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">{footerContent.description}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Linkedin"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{footerContent.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.services}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.projects}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  {footerContent.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{footerContent.contactInfo}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{footerContent.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{footerContent.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#c4975a] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{footerContent.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {footerContent.company}. {footerContent.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
