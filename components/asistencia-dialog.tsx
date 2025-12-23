"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { mockSocios, mockClases } from "@/lib/mock-admin-data"
import type { Asistencia } from "@/lib/types"

interface AsistenciaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (asistencia: Omit<Asistencia, "id">) => void
}

export function AsistenciaDialog({ open, onOpenChange, onSave }: AsistenciaDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    socioId: "",
    fecha: new Date().toISOString().split("T")[0],
    horaEntrada: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    tipo: "libre" as Asistencia["tipo"],
    claseId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const socio = mockSocios.find((s) => s.id === formData.socioId)
    const clase = formData.claseId ? mockClases.find((c) => c.id === formData.claseId) : null

    const asistenciaData: Omit<Asistencia, "id"> = {
      socioId: formData.socioId,
      socioNombre: socio?.nombre || "",
      fecha: formData.fecha,
      horaEntrada: formData.horaEntrada,
      tipo: formData.tipo,
      ...(clase && {
        claseId: clase.id,
        claseNombre: clase.nombre,
      }),
    }

    onSave(asistenciaData)
    setIsLoading(false)
    setFormData({
      socioId: "",
      fecha: new Date().toISOString().split("T")[0],
      horaEntrada: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      tipo: "libre",
      claseId: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Asistencia</DialogTitle>
          <DialogDescription>Registra la entrada de un socio al gimnasio</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="socioId">Socio *</Label>
            <Select value={formData.socioId} onValueChange={(value) => setFormData({ ...formData, socioId: value })}>
              <SelectTrigger id="socioId">
                <SelectValue placeholder="Seleccionar socio" />
              </SelectTrigger>
              <SelectContent>
                {mockSocios
                  .filter((s) => s.estado === "activo")
                  .map((socio) => (
                    <SelectItem key={socio.id} value={socio.id}>
                      {socio.nombre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha *</Label>
              <Input
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaEntrada">Hora de entrada *</Label>
              <Input
                id="horaEntrada"
                type="time"
                value={formData.horaEntrada}
                onChange={(e) => setFormData({ ...formData, horaEntrada: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de acceso *</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: Asistencia["tipo"]) => setFormData({ ...formData, tipo: value, claseId: "" })}
            >
              <SelectTrigger id="tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="libre">Acceso Libre</SelectItem>
                <SelectItem value="clase">Clase Programada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.tipo === "clase" && (
            <div className="space-y-2">
              <Label htmlFor="claseId">Clase</Label>
              <Select value={formData.claseId} onValueChange={(value) => setFormData({ ...formData, claseId: value })}>
                <SelectTrigger id="claseId">
                  <SelectValue placeholder="Seleccionar clase" />
                </SelectTrigger>
                <SelectContent>
                  {mockClases
                    .filter((c) => c.estado === "activa")
                    .map((clase) => (
                      <SelectItem key={clase.id} value={clase.id}>
                        {clase.nombre} - {clase.horaInicio}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Registrar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
