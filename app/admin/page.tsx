"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1% from last month",
      icon: Users,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19% from last month",
      icon: CreditCard,
    },
    {
      title: "Active Now",
      value: "+573",
      change: "+201 since last hour",
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-8">
      <h2 className="font-display text-3xl text-shinest-blue">Dashboard Overview</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-shinest-blue">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-shinest-blue">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-shinest-blue font-bold">
                    JD
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                  <div className="ml-auto font-medium text-shinest-blue">+$1,999.00</div>
                </div>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-shinest-blue font-bold">
                    AS
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Alice Smith</p>
                    <p className="text-sm text-gray-500">alice.s@example.com</p>
                  </div>
                  <div className="ml-auto font-medium text-shinest-blue">+$3,500.00</div>
                </div>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-shinest-blue font-bold">
                    MJ
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Michael Johnson</p>
                    <p className="text-sm text-gray-500">michael.j@example.com</p>
                  </div>
                  <div className="ml-auto font-medium text-shinest-blue">+$899.00</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-shinest-blue">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">A simple overview of your data.</p>
              {/* Placeholder for a chart or more complex data visualization */}
              <div className="h-48 bg-gray-50 rounded-md mt-4 flex items-center justify-center text-gray-400">
                [Chart Placeholder]
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
