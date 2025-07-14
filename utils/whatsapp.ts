export function sendWhatsAppMessage(message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const phoneNumber = "905521798735" // SHINEST WhatsApp numarası
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

      // Yeni pencerede WhatsApp'ı aç
      window.open(whatsappUrl, "_blank")

      // Promise'i resolve et
      resolve()
    } catch (error) {
      console.error("WhatsApp message error:", error)
      reject(error)
    }
  })
}

export function openWhatsApp(message?: string): void {
  const phoneNumber = "905521798735"
  const defaultMessage = "Merhaba, SHINEST İç Mimarlık hizmetleriniz hakkında bilgi almak istiyorum."
  const finalMessage = message || defaultMessage
  const encodedMessage = encodeURIComponent(finalMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, "_blank")
}
