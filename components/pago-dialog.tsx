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
import { mockSocios } from "@/lib/mock-admin-data"
import type { Pago } from "@/lib/types"

interface PagoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (pago: Omit<Pago, "id">) => void
}

export function PagoDialog({ open, onOpenChange, onSave }: PagoDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    socioId: "",
    concepto: "",
    monto: "",
    metodoPago: "efectivo" as Pago["metodoPago"],
    estado: "pagado" as Pago["estado"],
    fecha: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const socio = mockSocios.find((s) => s.id === formData.socioId)

    const pagoData: Omit<Pago, "id"> = {
      socioId: formData.socioId,
      socioNombre: socio?.nombre || "",
      concepto: formData.concepto,
      monto: Number(formData.monto),
      metodoPago: formData.metodoPago,
      estado: formData.estado,
      fecha: formData.fecha,
    }

    onSave(pagoData)
    setIsLoading(false)
    setFormData({
      socioId: "",
      concepto: "",
      monto: "",
      metodoPago: "efectivo",
      estado: "pagado",
      fecha: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Pago</DialogTitle>
          <DialogDescription>Registra un nuevo pago o cobro</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="socioId">Socio *</Label>
            <Select value={formData.socioId} onValueChange={(value) => setFormData({ ...formData, socioId: value })}>
              <SelectTrigger id="socioId">
                <SelectValue placeholder="Seleccionar socio" />
              </SelectTrigger>
              <SelectContent>
                {mockSocios.map((socio) => (
                  <SelectItem key={socio.id} value={socio.id}>
                    {socio.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="concepto">Concepto *</Label>
            <Input
              id="concepto"
              value={formData.concepto}
              onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
              placeholder="Ej: Membresía Mensual - Enero 2025"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monto">Monto (€) *</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="metodoPago">Método de pago *</Label>
              <Select
                value={formData.metodoPago}
                onValueChange={(value: Pago["metodoPago"]) => setFormData({ ...formData, metodoPago: value })}
              >
                <SelectTrigger id="metodoPago">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Select
                value={formData.estado}
                onValueChange={(value: Pago["estado"]) => setFormData({ ...formData, estado: value })}
              >
                <SelectTrigger id="estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pagado">Pagado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
                "Registrar Pago"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
