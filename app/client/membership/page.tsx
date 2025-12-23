import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser, mockMembership } from "@/lib/mock-data"
import { ChevronLeft, Calendar, CreditCard, Clock } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-4">
      <AppHeader userName={currentUser.name} userRole={currentUser.role} />

      <main className="container mx-auto max-w-2xl space-y-6 p-4">
        <div className="flex items-center gap-3">
          <Link href="/client">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mi Membresía</h1>
            <p className="text-sm text-muted-foreground">Detalles de tu plan</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{mockMembership.planName}</CardTitle>
              <StatusBadge status={mockMembership.status} />
            </div>
            <CardDescription>Información de tu membresía actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Modalidad</p>
                  <p className="text-sm text-muted-foreground">{mockMembership.modality}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Fecha de inicio</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(mockMembership.startDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {mockMembership.endDate && (
                <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Fecha de vencimiento</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(mockMembership.endDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {mockMembership.remainingCredits !== undefined && (
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">Créditos restantes</p>
                  <p className="text-2xl font-bold text-primary">{mockMembership.remainingCredits}</p>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Historial de Membresías</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Plan Premium - Mensual</span>
                  <span className="text-muted-foreground">Ene 2024 - Actual</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav role="client" />
    </div>
  )
}
