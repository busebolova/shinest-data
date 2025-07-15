// `auth` modülünün tamamını içe aktarmak yerine, doğrudan `auth` fonksiyonunu içe aktarın.
// `import * as AuthModule from "@/auth"` satırını aşağıdaki ile değiştirin:
import { auth } from "@/auth"

export const config = {
  // Middleware'in hangi yollarda çalışacağını belirtir
  matcher: ["/admin/:path*"],
}

// `AuthModule.auth` yerine doğrudan `auth` kullanın:
// `export default AuthModule.auth((req) => {` satırını aşağıdaki ile değiştirin:
export default auth((req) => {
  // Eğer kullanıcı kimliği doğrulanmamışsa ve /admin yoluyla başlıyorsa
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    // Kullanıcıyı giriş sayfasına yönlendir
    const newUrl = new URL("/admin/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
