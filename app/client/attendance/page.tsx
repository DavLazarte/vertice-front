import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser, mockAttendance } from "@/lib/mock-data"
import { ChevronLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function AttendancePage() {
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
            <h1 className="text-2xl font-bold text-foreground">Mi Asistencia</h1>
            <p className="text-sm text-muted-foreground">Historial de visitas al gimnasio</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Asistencia</CardTitle>
            <CardDescription>Registro de tus visitas al gimnasio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAttendance.map((attendance) => (
                <div
                  key={attendance.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-foreground">{attendance.className}</p>
                    <p className="text-sm text-muted-foreground">{attendance.modality}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(attendance.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {attendance.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {mockAttendance.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">Sin asistencias registradas</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tus visitas al gimnasio aparecerán aquí una vez que asistas a una clase.
            </p>
          </div>
        )}
      </main>

      <MobileNav role="client" />
    </div>
  )
}
