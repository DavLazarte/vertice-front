"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter, DollarSign, TrendingUp } from "lucide-react"
import { mockPagos } from "@/lib/mock-admin-data"
import { PagoDialog } from "@/components/pago-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Pago } from "@/lib/types"

export default function PagosPage() {
  const [pagos, setPagos] = useState<Pago[]>(mockPagos)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("todos")
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredPagos = pagos.filter((pago) => {
    const matchesSearch = pago.socioNombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterEstado === "todos" || pago.estado === filterEstado
    return matchesSearch && matchesFilter
  })

  const handleRegisterPago = (pago: Omit<Pago, "id">) => {
    const newPago = {
      ...pago,
      id: String(Date.now()),
    }
    setPagos([newPago, ...pagos])
    setIsRegisterDialogOpen(false)
    toast({
      title: "Pago registrado",
      description: `Pago de ${pago.socioNombre} registrado correctamente.`,
    })
  }

  const totalIngresos = pagos.filter((p) => p.estado === "pagado").reduce((sum, p) => sum + p.monto, 0)
  const pagosPendientes = pagos.filter((p) => p.estado === "pendiente").length
  const ingresosEsteMes = pagos
    .filter(
      (p) =>
        p.estado === "pagado" &&
        new Date(p.fecha).getMonth() === new Date().getMonth() &&
        new Date(p.fecha).getFullYear() === new Date().getFullYear(),
    )
    .reduce((sum, p) => sum + p.monto, 0)

  const getEstadoBadge = (estado: Pago["estado"]) => {
    const variants = {
      pagado: "default",
      pendiente: "secondary",
      vencido: "destructive",
    }
    const labels = {
      pagado: "Pagado",
      pendiente: "Pendiente",
      vencido: "Vencido",
    }
    return <Badge variant={variants[estado] as any}>{labels[estado]}</Badge>
  }

  return (
    <AdminLayout userName="Roberto Díaz">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pagos</h1>
            <p className="text-sm text-muted-foreground">Gestión de pagos y cobros</p>
          </div>
          <Button onClick={() => setIsRegisterDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Registrar Pago
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4" />
                Ingresos Totales
              </CardTitle>
              <CardDescription>Pagos completados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">€{totalIngresos.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{pagos.filter((p) => p.estado === "pagado").length} pagos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Este Mes
              </CardTitle>
              <CardDescription>Ingresos mensuales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">€{ingresosEsteMes.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">ingresos del mes actual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pagos Pendientes</CardTitle>
              <CardDescription>Por cobrar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{pagosPendientes}</div>
              <p className="text-xs text-muted-foreground">pagos pendientes</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pagado">Pagados</SelectItem>
              <SelectItem value="pendiente">Pendientes</SelectItem>
              <SelectItem value="vencido">Vencidos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Socio</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPagos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="text-sm text-muted-foreground">No se encontraron pagos</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell>
                      <span className="text-sm text-foreground">
                        {new Date(pago.fecha).toLocaleDateString("es-ES")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{pago.socioNombre}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{pago.concepto}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">€{pago.monto}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm capitalize text-muted-foreground">{pago.metodoPago}</span>
                    </TableCell>
                    <TableCell>{getEstadoBadge(pago.estado)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {filteredPagos.length} de {pagos.length} pagos
          </span>
        </div>
      </div>

      <PagoDialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen} onSave={handleRegisterPago} />
    </AdminLayout>
  )
}
