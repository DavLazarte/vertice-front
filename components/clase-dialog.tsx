"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { mockInstructores } from "@/lib/mock-admin-data"
import type { Clase } from "@/lib/types"

interface ClaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clase?: Clase
  onSave: (clase: Clase | Omit<Clase, "id" | "inscritos">) => void
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export function ClaseDialog({ open, onOpenChange, clase, onSave }: ClaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    instructorId: "",
    diaSemana: [] as string[],
    horaInicio: "",
    duracion: "",
    cupoMaximo: "",
    descripcion: "",
    estado: "activa" as Clase["estado"],
  })

  useEffect(() => {
    if (clase) {
      setFormData({
        nombre: clase.nombre,
        instructorId: clase.instructorId,
        diaSemana: clase.diaSemana,
        horaInicio: clase.horaInicio,
        duracion: String(clase.duracion),
        cupoMaximo: String(clase.cupoMaximo),
        descripcion: clase.descripcion,
        estado: clase.estado,
      })
    } else {
      setFormData({
        nombre: "",
        instructorId: "",
        diaSemana: [],
        horaInicio: "",
        duracion: "",
        cupoMaximo: "",
        descripcion: "",
        estado: "activa",
      })
    }
  }, [clase, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const instructor = mockInstructores.find((i) => i.id === formData.instructorId)

    const claseData = {
      nombre: formData.nombre,
      instructorId: formData.instructorId,
      instructorNombre: instructor?.nombre || "",
      diaSemana: formData.diaSemana,
      horaInicio: formData.horaInicio,
      duracion: Number(formData.duracion),
      cupoMaximo: Number(formData.cupoMaximo),
      descripcion: formData.descripcion,
      estado: formData.estado,
    }

    if (clase) {
      onSave({ ...claseData, id: clase.id, inscritos: clase.inscritos })
    } else {
      onSave(claseData)
    }

    setIsLoading(false)
  }

  const toggleDia = (dia: string) => {
    setFormData({
      ...formData,
      diaSemana: formData.diaSemana.includes(dia)
        ? formData.diaSemana.filter((d) => d !== dia)
        : [...formData.diaSemana, dia],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{clase ? "Editar Clase" : "Nueva Clase"}</DialogTitle>
          <DialogDescription>
            {clase ? "Actualiza la información de la clase" : "Completa los datos para crear una nueva clase"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la clase *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="CrossFit, Yoga, Spinning..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructorId">Instructor *</Label>
            <Select
              value={formData.instructorId}
              onValueChange={(value) => setFormData({ ...formData, instructorId: value })}
            >
              <SelectTrigger id="instructorId">
                <SelectValue placeholder="Seleccionar instructor" />
              </SelectTrigger>
              <SelectContent>
                {mockInstructores
                  .filter((i) => i.estado === "activo")
                  .map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.nombre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Días de la semana *</Label>
            <div className="grid grid-cols-2 gap-2">
              {diasSemana.map((dia) => (
                <div key={dia} className="flex items-center space-x-2">
                  <Checkbox
                    id={dia}
                    checked={formData.diaSemana.includes(dia)}
                    onCheckedChange={() => toggleDia(dia)}
                  />
                  <label
                    htmlFor={dia}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {dia}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="horaInicio">Hora inicio *</Label>
              <Input
                id="horaInicio"
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion">Duración (min) *</Label>
              <Input
                id="duracion"
                type="number"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                placeholder="60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cupoMaximo">Cupo máximo *</Label>
              <Input
                id="cupoMaximo"
                type="number"
                value={formData.cupoMaximo}
                onChange={(e) => setFormData({ ...formData, cupoMaximo: e.target.value })}
                placeholder="20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción de la clase..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado *</Label>
            <Select
              value={formData.estado}
              onValueChange={(value: Clase["estado"]) => setFormData({ ...formData, estado: value })}
            >
              <SelectTrigger id="estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activa">Activa</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : clase ? (
                "Actualizar"
              ) : (
                "Crear Clase"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
