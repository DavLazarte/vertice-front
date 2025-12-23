"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { mockClients, mockMembership } from "@/lib/mock-data"
import { ChevronLeft, Search, Phone, Mail, Calendar, UserCheck } from "lucide-react"
import Link from "next/link"

const receptionUser = {
  name: "Ana Martínez",
  role: "reception",
}

export default function SearchClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const filteredClients = mockClients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
            <h1 className="text-2xl font-bold text-foreground">Buscar Cliente</h1>
            <p className="text-sm text-muted-foreground">Encuentra información del cliente</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {filteredClients.length} {filteredClients.length === 1 ? "resultado" : "resultados"}
            </p>
            {filteredClients.map((client) => (
              <Card key={client.id} className="cursor-pointer transition-colors hover:bg-accent/50">
                <CardContent className="p-4" onClick={() => setSelectedClient(client.id)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Client Profile */}
        {client && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{client.name}</h2>
                      <p className="text-sm text-muted-foreground">ID: {client.id}</p>
                    </div>
                    <StatusBadge status={mockMembership.status} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{client.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Información de Membresía</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium text-foreground">{mockMembership.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modalidad:</span>
                    <span className="font-medium text-foreground">{mockMembership.modality}</span>
                  </div>
                  {mockMembership.endDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vencimiento:</span>
                      <span className="font-medium text-foreground">
                        {new Date(mockMembership.endDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Link href={`/reception/book?client=${client.id}`}>
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservar Clase
                </Button>
              </Link>
              <Link href={`/reception/attendance?client=${client.id}`}>
                <Button variant="outline" className="w-full bg-transparent">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Registrar Asistencia
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <MobileNav role="reception" />
    </div>
  )
}
