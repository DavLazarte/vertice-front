"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { ClassCard } from "@/components/class-card"
import { Button } from "@/components/ui/button"
import { currentUser, mockClasses } from "@/lib/mock-data"
import { ChevronLeft, Filter } from "lucide-react"
import Link from "next/link"

export default function BookClassPage() {
  const [selectedModality, setSelectedModality] = useState<string>("Todos")
  const modalities = ["Todos", "Funcional", "Bienestar", "Cardio"]

  const filteredClasses =
    selectedModality === "Todos" ? mockClasses : mockClasses.filter((c) => c.modality === selectedModality)

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
            <h1 className="text-2xl font-bold text-foreground">Reservar Clase</h1>
            <p className="text-sm text-muted-foreground">Encuentra tu próxima sesión</p>
          </div>
        </div>

        {/* Filter by modality */}
        <div className="space-y-3">
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
        </div>

        {/* Classes List */}
        <div className="space-y-3">
          {filteredClasses.map((classSession) => (
            <ClassCard key={classSession.id} classSession={classSession} showBookButton />
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground">No hay clases disponibles</h3>
            <p className="mt-2 text-sm text-muted-foreground">Prueba cambiando el filtro de modalidad</p>
          </div>
        )}
      </main>

      <MobileNav role="client" />
    </div>
  )
}
