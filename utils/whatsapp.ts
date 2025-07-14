export const getWhatsAppURL = () => {
  const phoneNumber = "905521798735" // Türkiye telefon numarası

  const message = `İç Mimarlık Hizmeti Talep Formu

Selamlar!

Hayalinizdeki yaşam alanını birlikte tasarlamak için sizi daha yakından tanımak isteriz. Bu form aracılığıyla ihtiyaçlarınızı, beklentilerinizi ve proje detaylarınızı bize iletebilirsiniz.

Formu doldurmanızın ardından, tercih ettiğiniz iletişim kanalı üzerinden, en geç 2 iş günü içerisinde tarafınıza özel olarak hazırladığımız teklif dosyası ile dönüş sağlanacaktır.

Paylaştığınız tüm bilgiler gizli tutulacak olup, yalnızca proje planlaması amacıyla kullanılacaktır.

Zaman ayırdığınız için teşekkür eder, ilham dolu bir tasarım sürecinin sizi beklediğini belirtmek isteriz.

---

Lütfen aşağıdaki bilgileri doldurunuz:

1. İsim Soyisim: 

2. Telefon: 

3. E-posta: 

4. Teklif Dosyası için tercih ettiğiniz iletişim kanalı:
   □ WhatsApp
   □ E-posta

5. Size uygun olacağını düşündüğünüz tasarım paketi:
   □ Işıltı (Konut)
   □ Işıltı Pro (Konut)
   □ Parıltı (Konut)
   □ Zarafet (Konut)
   □ Diva (Konut)
   □ İkon (Ticari)
   □ Elit (Ticari)
   □ Star (Ticari)
   □ İncelemedim

6. Online ön görüşme için tercih ettiğiniz görüşme şekli:
   □ Yazılı iletişim (E-posta/WhatsApp)
   □ Yerinde keşif istiyorum (İzmir için geçerlidir. Diğer şehirlere yol & masraf ücretleri eklenir)

Teşekkürler! 🌟`

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
