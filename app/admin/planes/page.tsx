"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { PlanDialog } from "@/components/plan-dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/lib/api";
import type { Plan } from "@/lib/types";

export default function PlanesPage() {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { toast } = useToast();

  const loadPlanes = async () => {
    setIsLoading(true);
    try {
      const data = await api.getPlanes(searchTerm);
      // Adaptar datos si es necesario
      const adaptedPlanes = (data || []).map((item: any) => ({
        ...item,
        id: item.idservicio ? String(item.idservicio) : String(Math.random()),
        // Asegurar que estado sea booleano
        estado: !!item.estado,
        // Asegurar números
        precio: parseFloat(item.precio) || 0,
        duracion_dias: item.duracion_dias
          ? parseInt(item.duracion_dias)
          : undefined,
        creditos: item.creditos ? parseInt(item.creditos) : undefined,
      }));
      setPlanes(adaptedPlanes);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los planes",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      loadPlanes();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleCreatePlan = async (planData: any) => {
    try {
      await api.createPlan(planData);
      toast({
        title: "Plan creado",
        description: "El plan se ha creado exitosamente.",
      });
      loadPlanes();
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear",
        description: error.message || "Ocurrió un error",
      });
    }
  };

  const handleUpdatePlan = async (planData: any) => {
    if (!editingPlan) return;
    try {
      await api.updatePlan(editingPlan.id, planData);
      toast({
        title: "Plan actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
      loadPlanes();
      setEditingPlan(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: error.message || "Ocurrió un error",
      });
    }
  };

  const handleDeletePlan = async () => {
    if (!deleteId) return;
    try {
      await api.deletePlan(deleteId);
      toast({
        title: "Plan eliminado",
        description: "El plan ha sido eliminado correctamente",
      });
      loadPlanes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el plan",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Planes y Servicios
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los tipos de membresías y pases disponibles
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Plan
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar planes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Cargando planes...
                    </div>
                  </TableCell>
                </TableRow>
              ) : planes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No se encontraron planes registrados.
                  </TableCell>
                </TableRow>
              ) : (
                planes.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.nombre}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {plan.descripcion || "-"}
                    </TableCell>
                    <TableCell>${plan.precio}</TableCell>
                    <TableCell>
                      {plan.creditos ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        >
                          Créditos
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200"
                        >
                          Tiempo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {plan.creditos
                        ? `${plan.creditos} clases`
                        : `${plan.duracion_dias} días`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={plan.estado ? "default" : "secondary"}>
                        {plan.estado ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingPlan(plan)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(plan.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PlanDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleCreatePlan}
      />

      <PlanDialog
        open={!!editingPlan}
        onOpenChange={(open) => !open && setEditingPlan(null)}
        plan={editingPlan || undefined}
        onSave={handleUpdatePlan}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el plan y podría afectar a las membresías históricas si no se
              maneja con cuidado (Soft Delete).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeletePlan}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
