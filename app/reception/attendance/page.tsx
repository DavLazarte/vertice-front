"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockClients, mockClasses } from "@/lib/mock-data"
import { ChevronLeft, Search, CheckCircle2, Calendar } from "lucide-react"
import Link from "next/link"

const receptionUser = {
  name: "Ana Martínez",
  role: "reception",
}

export default function RegisterAttendancePage() {
  const [clientSearch, setClientSearch] = useState("")
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [success, setSuccess] = useState(false)

  const filteredClients = mockClients.filter((client) => client.name.toLowerCase().includes(clientSearch.toLowerCase()))

  const client = mockClients.find((c) => c.id === selectedClient)
  const classSession = mockClasses.find((c) => c.id === selectedClass)

  const handleRegisterAttendance = () => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setSelectedClient("")
      setSelectedClass("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-4">
      <AppHeader userName={receptionUser.name} userRole={receptionUser.role} />

      <main className="container mx-auto max-w-2xl space-y-6 p-4">
        <div className="flex items-center gap-3">
          <Link href="/reception">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Registrar Asistencia</h1>
            <p className="text-sm text-muted-foreground">Confirmar llegada de cliente</p>
          </div>
        </div>

        {success && (
          <Alert className="border-primary bg-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">Asistencia registrada correctamente</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Select Client */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">1. Buscar Cliente</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {clientSearch && (
            <div className="space-y-2">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id)
                    setClientSearch("")
                  }}
                  className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent"
                >
                  <p className="font-medium text-foreground">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </button>
              ))}
            </div>
          )}

          {client && (
            <Card>
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground">Cliente seleccionado:</p>
                <p className="font-semibold text-foreground">{client.name}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Step 2: Select Class or Free Access */}
        {client && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">2. Seleccionar Clase (Opcional)</h2>
            <p className="text-sm text-muted-foreground">Selecciona una clase o registra acceso libre</p>

            <div className="space-y-2">
              {mockClasses.slice(0, 3).map((classSession) => (
                <button
                  key={classSession.id}
                  onClick={() => setSelectedClass(classSession.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                    selectedClass === classSession.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{classSession.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {classSession.time} - {classSession.instructor}
                      </p>
                    </div>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              ))}

              <button
                onClick={() => setSelectedClass("free")}
                className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                  selectedClass === "free" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <p className="font-semibold text-foreground">Acceso Libre</p>
                <p className="text-sm text-muted-foreground">Sin clase específica</p>
              </button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {client && selectedClass && (
          <Card className="border-primary">
            <CardContent className="p-4">
              <h3 className="mb-3 font-semibold text-foreground">Confirmar Asistencia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span className="font-medium text-foreground">{client.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clase:</span>
                  <span className="font-medium text-foreground">
                    {selectedClass === "free" ? "Acceso Libre" : classSession?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-medium text-foreground">
                    {new Date().toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <Button className="mt-4 w-full" onClick={handleRegisterAttendance}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirmar Asistencia
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <MobileNav role="reception" />
    </div>
  )
}
