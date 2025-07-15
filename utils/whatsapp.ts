export const getWhatsAppURL = (formData: {
  fullName: string
  phone: string
  email: string
  designPackage: string
  meetingType: string
  message: string
}) => {
  const phoneNumber = "905521798735" // Türkiye telefon numarası

  const whatsappMessage = `Merhaba, SHINEST İç Mimarlık!

Teklif formu aracılığıyla size ulaşıyorum. İşte bilgilerim:

İsim Soyisim: ${formData.fullName || "Belirtilmedi"}
Telefon: ${formData.phone || "Belirtilmedi"}
E-posta: ${formData.email || "Belirtilmedi"}

İlgilendiğim Tasarım Paketi: ${formData.designPackage || "Belirtilmedi"}
Tercih Ettiğim Görüşme Şekli: ${formData.meetingType || "Belirtilmedi"}

Ek Mesajım:
${formData.message || "Yok"}

Teşekkürler!`

  const encodedMessage = encodeURIComponent(whatsappMessage)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
