"use client";

import { AppHeader } from "@/components/app-header";
import { MobileNav } from "@/components/mobile-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useRequireRole } from "@/hooks/useRequireRole";


export default function AdminDashboardPage() {
  // Solo gym_owner puede acceder
  const { user, loading } = useRequireRole('gym_owner');

 
  

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-4">
      {/* <AppHeader userName={user.name} userRole="admin" /> */}

      <main className="container mx-auto max-w-6xl space-y-6 p-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Panel de Administración
          </h1>
          <p className="text-sm text-muted-foreground">
            Bienvenido, {user.name}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Miembros Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">127</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+12%</span> respecto al mes
                anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clases Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground">
                8 clases en curso ahora
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reservas Activas
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">342</div>
              <p className="text-xs text-muted-foreground">Para esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Estimados
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">€ 12,450</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+8%</span> respecto al mes
                anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Asistencia Semanal</CardTitle>
              <CardDescription>Número de visitas por día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "Lun", visits: 45, percentage: 90 },
                  { day: "Mar", visits: 52, percentage: 100 },
                  { day: "Mié", visits: 48, percentage: 92 },
                  { day: "Jue", visits: 41, percentage: 79 },
                  { day: "Vie", visits: 38, percentage: 73 },
                  { day: "Sáb", visits: 35, percentage: 67 },
                  { day: "Dom", visits: 28, percentage: 54 },
                ].map((item) => (
                  <div key={item.day} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {item.day}
                      </span>
                      <span className="text-muted-foreground">
                        {item.visits} visitas
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clases Populares</CardTitle>
              <CardDescription>Top 5 clases más reservadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "CrossFit", reservations: 89, trend: "+15%" },
                  { name: "Spinning", reservations: 76, trend: "+8%" },
                  { name: "Yoga", reservations: 68, trend: "+12%" },
                  { name: "HIIT", reservations: 54, trend: "+5%" },
                  { name: "Pilates", reservations: 42, trend: "+3%" },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.reservations} reservas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span>{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Membresías</CardTitle>
              <CardDescription>Estado de las membresías</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Activas</span>
                <span className="font-semibold text-primary">104</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Por vencer (7 días)
                </span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-500">
                  18
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vencidas</span>
                <span className="font-semibold text-destructive">5</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ocupación Hoy</CardTitle>
              <CardDescription>Porcentaje de ocupación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">78%</div>
                  <p className="text-sm text-muted-foreground">
                    Ocupación actual
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Instructores</CardTitle>
              <CardDescription>Personal activo hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Carlos Ruiz", classes: 4 },
                  { name: "Ana Martínez", classes: 3 },
                  { name: "Pedro López", classes: 5 },
                ].map((instructor) => (
                  <div
                    key={instructor.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium text-foreground">
                      {instructor.name}
                    </span>
                    <span className="text-muted-foreground">
                      {instructor.classes} clases
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </main>

      <MobileNav role="admin" />
    </div>
  );
}
