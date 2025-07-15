import { auth } from "@auth/nextjs/middleware" // Bu import yolu NextAuth.js v5 için doğrudur.

export default auth((req) => {
  // Eğer kullanıcı kimliği doğrulanmamışsa ve /admin yoluyla başlıyorsa
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    // Kullanıcıyı giriş sayfasına yönlendir
    const newUrl = new URL("/admin/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  // Middleware'in hangi yollarda çalışacağını belirtir
  matcher: ["/admin/:path*"],
}
