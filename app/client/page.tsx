"use client";

import { AppHeader } from "@/components/app-header";
import { MobileNav } from "@/components/mobile-nav";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRequireRole } from "@/hooks/useRequireRole";
import { currentUser, mockMembership, mockReservations } from "@/lib/mock-data";
import { Calendar, CreditCard, History, User } from "lucide-react";
import Link from "next/link";

export default function ClientDashboardPage() {
  const nextClass = mockReservations.find((r) => r.status === "Reservada");
  // Solo gym_socio puede acceder
  const { user, loading } = useRequireRole("gym_socio");

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
      <AppHeader userName={user.name} userRole="client" />

      <main className="container mx-auto max-w-2xl space-y-6 p-4">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Hola, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Bienvenido a tu panel de control
          </p>
        </div>

        {/* Membership Status Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Estado de Membresía</CardTitle>
              <StatusBadge status={mockMembership.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Plan</p>
                <p className="font-semibold text-foreground">
                  {mockMembership.planName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Modalidad</p>
                <p className="font-semibold text-foreground">
                  {mockMembership.modality}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">
                Fecha de vencimiento
              </p>
              <p className="text-sm font-semibold text-foreground">
                {mockMembership.endDate
                  ? new Date(mockMembership.endDate).toLocaleDateString(
                      "es-ES",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Sin vencimiento"}
              </p>
            </div>

            <Link href="/client/membership">
              <Button variant="outline" className="w-full bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                Ver detalles de membresía
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Next Class Card */}
        {nextClass && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próxima Clase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">
                    {nextClass.className}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {nextClass.modality}
                  </p>
                </div>
                <StatusBadge status={nextClass.status} />
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(nextClass.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  <span>{nextClass.time}</span>
                </div>
              </div>

              <Link href="/client/reservations">
                <Button variant="secondary" className="w-full">
                  Ver mis reservas
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid gap-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/client/book">
                <Button className="w-full justify-start" size="lg">
                  <Calendar className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Reservar Clase</span>
                    <span className="text-xs font-normal opacity-90">
                      Ver clases disponibles
                    </span>
                  </div>
                </Button>
              </Link>

              <Link href="/client/attendance">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="lg"
                >
                  <History className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Mi Asistencia</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Historial de visitas
                    </span>
                  </div>
                </Button>
              </Link>

              <Link href="/client/profile">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="lg"
                >
                  <User className="mr-3 h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">Mi Perfil</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Editar información personal
                    </span>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav role="client" />
    </div>
  );
}
