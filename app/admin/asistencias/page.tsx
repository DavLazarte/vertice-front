"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Calendar } from "lucide-react"
import { mockAsistencias } from "@/lib/mock-admin-data"
import { AsistenciaDialog } from "@/components/asistencia-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Asistencia } from "@/lib/types"

export default function AsistenciasPage() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>(mockAsistencias)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredAsistencias = asistencias.filter((asistencia) =>
    asistencia.socioNombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRegisterAsistencia = (asistencia: Omit<Asistencia, "id">) => {
    const newAsistencia = {
      ...asistencia,
      id: String(Date.now()),
    }
    setAsistencias([newAsistencia, ...asistencias])
    setIsRegisterDialogOpen(false)
    toast({
      title: "Asistencia registrada",
      description: `Entrada de ${asistencia.socioNombre} registrada correctamente.`,
    })
  }

  const asistenciasHoy = asistencias.filter((a) => a.fecha === new Date().toISOString().split("T")[0])
  const asistenciasSemana = asistencias.length

  return (
    <AdminLayout userName="Roberto Díaz">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Asistencias</h1>
            <p className="text-sm text-muted-foreground">Registro y seguimiento de asistencia</p>
          </div>
          <Button onClick={() => setIsRegisterDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Registrar Asistencia
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hoy</CardTitle>
              <CardDescription>Asistencias registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{asistenciasHoy.length}</div>
              <p className="text-xs text-muted-foreground">visitas al gimnasio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Esta Semana</CardTitle>
              <CardDescription>Total de asistencias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{asistenciasSemana}</div>
              <p className="text-xs text-muted-foreground">asistencias registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Promedio Diario</CardTitle>
              <CardDescription>Últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{Math.round(asistenciasSemana / 7)}</div>
              <p className="text-xs text-muted-foreground">asistencias por día</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por socio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Socio</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Clase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAsistencias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="text-sm text-muted-foreground">No se encontraron asistencias</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAsistencias.map((asistencia) => (
                  <TableRow key={asistencia.id}>
                    <TableCell>
                      <span className="font-medium text-foreground">{asistencia.socioNombre}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(asistencia.fecha).toLocaleDateString("es-ES")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-primary">{asistencia.horaEntrada}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{asistencia.horaSalida || "-"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={asistencia.tipo === "clase" ? "default" : "secondary"}>
                        {asistencia.tipo === "clase" ? "Clase" : "Libre"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{asistencia.claseNombre || "-"}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {filteredAsistencias.length} de {asistencias.length} asistencias
          </span>
        </div>
      </div>

      <AsistenciaDialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
        onSave={handleRegisterAsistencia}
      />
    </AdminLayout>
  )
}
