"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { ClassCard } from "@/components/class-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockClasses, mockClients } from "@/lib/mock-data"
import { ChevronLeft, Search, Filter } from "lucide-react"
import Link from "next/link"

const receptionUser = {
  name: "Ana Martínez",
  role: "reception",
}

export default function ReceptionBookClassPage() {
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [clientSearch, setClientSearch] = useState("")
  const [selectedModality, setSelectedModality] = useState<string>("Todos")

  const modalities = ["Todos", "Funcional", "Bienestar", "Cardio"]

  const filteredClients = mockClients.filter((client) => client.name.toLowerCase().includes(clientSearch.toLowerCase()))

  const filteredClasses =
    selectedModality === "Todos" ? mockClasses : mockClasses.filter((c) => c.modality === selectedModality)

  const client = mockClients.find((c) => c.id === selectedClient)

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
            <h1 className="text-2xl font-bold text-foreground">Reservar Clase</h1>
            <p className="text-sm text-muted-foreground">Para un cliente</p>
          </div>
        </div>

        {/* Step 1: Select Client */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">1. Seleccionar Cliente</h2>
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
            <div className="rounded-lg border border-primary bg-primary/5 p-3">
              <p className="text-sm text-muted-foreground">Cliente seleccionado:</p>
              <p className="font-semibold text-foreground">{client.name}</p>
            </div>
          )}
        </div>

        {/* Step 2: Select Class */}
        {client && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">2. Seleccionar Clase</h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtrar por modalidad</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {modalities.map((modality) => (
                <Button
                  key={modality}
                  variant={selectedModality === modality ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedModality(modality)}
                  className={selectedModality !== modality ? "bg-transparent" : ""}
                >
                  {modality}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredClasses.map((classSession) => (
                <ClassCard key={classSession.id} classSession={classSession} showBookButton />
              ))}
            </div>
          </div>
        )}
      </main>

      <MobileNav role="reception" />
    </div>
  )
}
