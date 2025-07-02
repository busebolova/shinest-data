"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function AboutPage() {
  const { language, t } = useLanguage()

  const letterVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const valueVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* SHINEST Letters Animation */}
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-2 md:space-x-4">
                  {"SHINEST".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={letterVariants}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-wider"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* About Title */}
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                {t("about.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              >
                {t("about.subtitle")}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={contentVariants}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t("about.company.title")}</h2>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Shinest İç Mimarlık olarak yenilikçi ve fonksiyonel iç mekan çözümleri sunarak, danışanlarımızın
                    yaşam alanlarına değer katmayı hedefleyen bir tasarım firmasıyız. Uzman ekibimiz ile her projede
                    özgün ve yaratıcı çözümler sunarak, mekanlarınızı işlevsel ve konforlu hale getiriyoruz.
                  </p>

                  <p>
                    Mekanların ruhunu ve kullanıcıların ihtiyaçlarını analiz ederek, her projede kişiye özel tasarımlar
                    oluşturuyoruz. Amacımız, sizlere hem göz alıcı hem de uzun ömürlü yaşam alanları sunmaktır.
                  </p>

                  <p>
                    Her adımda sizin isteklerinizi ve beklentilerinizi dikkate alarak, hayalinizdeki mekanı gerçeğe
                    dönüştürmek için çalışıyoruz. Yenilikçi yaklaşımımız, kaliteli işçiliğimiz ve müşteri odaklı hizmet
                    anlayışımızla iç mekan tasarımında fark yaratıyoruz.
                  </p>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/shinest-interior.jpg" alt="Shinest İç Mimarlık" fill className="object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SHINEST Studio</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vizyonumuz ve misyonumuzla geleceği şekillendiriyoruz
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  İç mimarlık alanında yenilikçi ve sürdürülebilir çözümlerle öncü olmak, her projede mükemmelliği
                  hedefleyerek sektörde fark yaratan bir marka olmak.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Müşterilerimizin hayallerini gerçeğe dönüştürmek, yaşam kalitelerini artıran fonksiyonel ve estetik
                  mekanlar tasarlamak, her projede kişiye özel çözümler sunmak.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                İş yapış şeklimizi belirleyen temel değerlerimiz
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Innovation */}
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={valueVariants}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Yenilikçilik</h3>
                  <p className="text-gray-600">
                    Sürekli gelişen teknoloji ve tasarım trendlerini takip ederek yenilikçi çözümler sunuyoruz.
                  </p>
                </div>
              </motion.div>

              {/* Quality */}
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={valueVariants}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kalite</h3>
                  <p className="text-gray-600">
                    Her projede en yüksek kalite standartlarını uygulayarak mükemmel sonuçlar elde ediyoruz.
                  </p>
                </div>
              </motion.div>

              {/* Sustainability */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={valueVariants}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sürdürülebilirlik</h3>
                  <p className="text-gray-600">
                    Çevre dostu malzemeler ve sürdürülebilir tasarım anlayışıyla geleceği düşünüyoruz.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Birlikte Çalışalım</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Hayalinizdeki mekanı birlikte tasarlayalım. SHINEST İç Mimarlık olarak, size özel çözümler sunmak için
                buradayız.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                İletişime Geçin
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
