"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Building2, Clock, Bell, Palette, Save, Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConfiguracionPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const [gymData, setGymData] = useState({
    nombre: "Vertice",
    direccion: "Calle Principal 123, Monteros",
    telefono: "+34 912 345 678",
    email: "info@vertice.ar",
    descripcion: "Centro deportivo especializado en entrenamiento funcional y clases grupales",
  })

  const [horarios, setHorarios] = useState({
    lunes: { apertura: "06:00", cierre: "23:00", cerrado: false },
    martes: { apertura: "06:00", cierre: "23:00", cerrado: false },
    miercoles: { apertura: "06:00", cierre: "23:00", cerrado: false },
    jueves: { apertura: "06:00", cierre: "23:00", cerrado: false },
    viernes: { apertura: "06:00", cierre: "23:00", cerrado: false },
    sabado: { apertura: "08:00", cierre: "20:00", cerrado: false },
    domingo: { apertura: "09:00", cierre: "15:00", cerrado: false },
  })

  const [notificaciones, setNotificaciones] = useState({
    recordatorioClases: true,
    alertaVencimiento: true,
    confirmacionPago: true,
    newsletterSemanal: false,
  })

  const handleSaveGymData = async () => {
    setIsSaving(true)
    setSuccess(false)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    setSuccess(true)

    toast({
      title: "Configuración guardada",
      description: "Los cambios se han guardado correctamente.",
    })

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <AdminLayout userName="Roberto Díaz">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-sm text-muted-foreground">Administra la configuración del gimnasio</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Datos del Gimnasio
            </CardTitle>
            <CardDescription>Información general y de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del gimnasio</Label>
                <Input
                  id="nombre"
                  value={gymData.nombre}
                  onChange={(e) => setGymData({ ...gymData, nombre: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  type="tel"
                  value={gymData.telefono}
                  onChange={(e) => setGymData({ ...gymData, telefono: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={gymData.email}
                onChange={(e) => setGymData({ ...gymData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={gymData.direccion}
                onChange={(e) => setGymData({ ...gymData, direccion: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={gymData.descripcion}
                onChange={(e) => setGymData({ ...gymData, descripcion: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horarios de Apertura
            </CardTitle>
            <CardDescription>Configura los horarios por día de la semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(horarios).map(([dia, horario]) => (
              <div key={dia}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-24 font-medium capitalize text-foreground">{dia}</span>
                    {!horario.cerrado ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={horario.apertura}
                          onChange={(e) =>
                            setHorarios({
                              ...horarios,
                              [dia]: { ...horario, apertura: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="time"
                          value={horario.cierre}
                          onChange={(e) =>
                            setHorarios({
                              ...horarios,
                              [dia]: { ...horario, cierre: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Cerrado</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`cerrado-${dia}`} className="text-sm">
                      Cerrado
                    </Label>
                    <Switch
                      id={`cerrado-${dia}`}
                      checked={horario.cerrado}
                      onCheckedChange={(checked) =>
                        setHorarios({
                          ...horarios,
                          [dia]: { ...horario, cerrado: checked },
                        })
                      }
                    />
                  </div>
                </div>
                {dia !== "domingo" && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>Configura las notificaciones automáticas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="recordatorioClases">Recordatorio de clases</Label>
                <p className="text-sm text-muted-foreground">Enviar recordatorios 1 hora antes de la clase</p>
              </div>
              <Switch
                id="recordatorioClases"
                checked={notificaciones.recordatorioClases}
                onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, recordatorioClases: checked })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="alertaVencimiento">Alerta de vencimiento</Label>
                <p className="text-sm text-muted-foreground">Notificar membresías próximas a vencer (7 días antes)</p>
              </div>
              <Switch
                id="alertaVencimiento"
                checked={notificaciones.alertaVencimiento}
                onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, alertaVencimiento: checked })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="confirmacionPago">Confirmación de pago</Label>
                <p className="text-sm text-muted-foreground">Enviar confirmación automática al registrar pagos</p>
              </div>
              <Switch
                id="confirmacionPago"
                checked={notificaciones.confirmacionPago}
                onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, confirmacionPago: checked })}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="newsletterSemanal">Newsletter semanal</Label>
                <p className="text-sm text-muted-foreground">Enviar resumen semanal de actividades</p>
              </div>
              <Switch
                id="newsletterSemanal"
                checked={notificaciones.newsletterSemanal}
                onCheckedChange={(checked) => setNotificaciones({ ...notificaciones, newsletterSemanal: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Personalización
            </CardTitle>
            <CardDescription>Logo y apariencia del gimnasio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Logo del gimnasio</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Cambiar logo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Formato recomendado: PNG o SVG, tamaño máximo 2MB</p>
            </div>
          </CardContent>
        </Card>

        {success && (
          <Alert className="border-primary bg-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">Configuración guardada correctamente</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar cambios</Button>
          <Button onClick={handleSaveGymData} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
