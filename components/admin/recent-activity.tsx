import { supabaseAdmin } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default async function RecentActivity() {
  // Son aktiviteleri al
  const { data: recentUpdates } = await supabaseAdmin
    .from("page_contents")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Son Aktiviteler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUpdates?.map((update) => (
            <div key={update.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-shinest-blue rounded-full mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {update.page_slug} - {update.section_key}
                </p>
                <p className="text-sm text-gray-500">{new Date(update.updated_at).toLocaleDateString("tr-TR")}</p>
              </div>
            </div>
          ))}
          {(!recentUpdates || recentUpdates.length === 0) && (
            <p className="text-sm text-gray-500">Henüz aktivite bulunmuyor</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
