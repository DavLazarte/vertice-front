"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Users, Clock } from "lucide-react";
import { ClaseDialog } from "@/components/clase-dialog";
import { ClaseDetailDialog } from "@/components/clase-detail-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Clase } from "@/lib/types";
import { api } from "@/lib/api";

export default function ClasesPage() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingClase, setEditingClase] = useState<Clase | null>(null);
  const [viewingClase, setViewingClase] = useState<Clase | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadClases();
  }, []);

  const loadClases = async () => {
    setIsLoading(true);
    try {
      const response = await api.getClases();
      setClases(response.clases);
    } catch (error) {
      console.error("Error cargando clases:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las clases",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClases = clases.filter(
    (clase) =>
      clase.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.coach?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    loadClases();
  };

  const getCupoColor = (inscritos: number, cupoMaximo: number) => {
    const percentage = (inscritos / cupoMaximo) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-500";
    return "text-primary";
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clases</h1>
            <p className="text-sm text-muted-foreground">
              Gestiona las clases del gimnasio
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Nueva Clase
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClases.map((clase) => (
            <Card
              key={clase.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setViewingClase(clase)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{clase.nombre}</CardTitle>
                    <CardDescription className="mt-1">
                      {clase.coach?.nombre}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      clase.estado === "activa" ? "default" : "secondary"
                    }
                  >
                    {clase.estado === "activa" ? "Activa" : "Cancelada"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {clase.hora_inicio} - {clase.duracion_minutos} min
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {clase.dias_semana.split(",").map((dia) => (
                    <Badge key={dia} variant="outline" className="text-xs">
                      {dia}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={`text-sm font-medium ${getCupoColor(
                        clase.inscritos_hoy || 0,
                        clase.cupo_maximo
                      )}`}
                    >
                      {clase.inscritos_hoy || 0}/{clase.cupo_maximo}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClase(clase);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${
                        ((clase.inscritos_hoy || 0) / clase.cupo_maximo) * 100
                      }%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClases.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-center text-muted-foreground">
                {searchTerm
                  ? "No se encontraron clases"
                  : "No hay clases registradas"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ClaseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleSave}
      />

      <ClaseDialog
        open={!!editingClase}
        onOpenChange={(open) => !open && setEditingClase(null)}
        clase={editingClase || undefined}
        onSave={handleSave}
      />

      <ClaseDetailDialog
        open={!!viewingClase}
        onOpenChange={(open) => !open && setViewingClase(null)}
        clase={viewingClase}
        onEdit={(clase) => {
          setViewingClase(null);
          setEditingClase(clase);
        }}
      />
    </>
  );
}
