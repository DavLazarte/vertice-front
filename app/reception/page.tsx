"use client";

import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, UserCheck, Users } from "lucide-react"
import { useRequireRole } from "@/hooks/useRequireRole"
import Link from "next/link"



export default function ReceptionDashboardPage() {
  const { user, loading } = useRequireRole('gym_staff');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-4">
      <AppHeader userName={user.name} userRole="reception"/>

      <main className="container mx-auto max-w-2xl space-y-6 p-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Panel de Recepción</h1>
          <p className="text-sm text-muted-foreground">Gestiona clientes y reservas</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">127</p>
                  <p className="text-xs text-muted-foreground">Clientes activos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Clases hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/reception/search">
              <Button className="w-full justify-start" size="lg">
                <Search className="mr-3 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Buscar Cliente</span>
                  <span className="text-xs font-normal opacity-90">Buscar por nombre o ID</span>
                </div>
              </Button>
            </Link>

            <Link href="/reception/attendance">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <UserCheck className="mr-3 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Registrar Asistencia</span>
                  <span className="text-xs font-normal text-muted-foreground">Confirmar llegada de cliente</span>
                </div>
              </Button>
            </Link>

            <Link href="/reception/book">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <Calendar className="mr-3 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Reservar Clase</span>
                  <span className="text-xs font-normal text-muted-foreground">Reservar para un cliente</span>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Clases de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "CrossFit", time: "09:00", enrolled: 12, capacity: 15 },
                { name: "Yoga", time: "10:30", enrolled: 18, capacity: 20 },
                { name: "Spinning", time: "18:00", enrolled: 25, capacity: 25 },
              ].map((classItem, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-semibold text-foreground">{classItem.name}</p>
                    <p className="text-sm text-muted-foreground">{classItem.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {classItem.enrolled}/{classItem.capacity}
                    </p>
                    <p className="text-xs text-muted-foreground">Inscritos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav role="reception" />
    </div>
  )
}
