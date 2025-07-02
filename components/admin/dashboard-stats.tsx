import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutGrid, FileText, ImageIcon } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    projects: number
    blogs: number
    media: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projeler</CardTitle>
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.projects}</div>
          <p className="text-xs text-muted-foreground">Toplam proje sayısı</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blog Yazıları</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.blogs}</div>
          <p className="text-xs text-muted-foreground">Toplam blog yazısı</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Medya Dosyaları</CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.media}</div>
          <p className="text-xs text-muted-foreground">Toplam medya dosyası</p>
        </CardContent>
      </Card>
    </div>
  )
}
