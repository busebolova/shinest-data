import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github" // Doğru import yolu

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin/login", // Özel giriş sayfası
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Sadece belirli bir GitHub kullanıcısının giriş yapmasına izin vermek için
      // const allowedGitHubUser = "your-github-username"; // Kendi GitHub kullanıcı adınızı buraya ekleyin
      // if (profile?.login === allowedGitHubUser) {
      //   return true;
      // } else {
      //   return "/admin/login?error=Unauthorized"; // Yetkisiz kullanıcılar için hata mesajı
      // }

      // Şimdilik tüm GitHub kullanıcılarına izin veriyoruz.
      // Güvenlik için yukarıdaki satırları kendi kullanıcı adınızla aktif edebilirsiniz.
      return true
    },
  },
})

// Next.js App Router için GET ve POST handler'larını dışa aktarın
export { handlers as GET, handlers as POST }
