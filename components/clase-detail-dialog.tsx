"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Clock, Calendar, Users, Pencil } from "lucide-react";
import type { Clase } from "@/lib/types";

interface ClaseDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clase: Clase | null;
  onEdit: (clase: Clase) => void;
}

export function ClaseDetailDialog({
  open,
  onOpenChange,
  clase,
  onEdit,
}: ClaseDetailDialogProps) {
  if (!clase) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Detalle de la Clase</DialogTitle>
            <Button variant="outline" size="sm" onClick={() => onEdit(clase)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                {clase.nombre}
              </h3>
              <Badge
                variant={clase.estado === "activa" ? "default" : "secondary"}
              >
                {clase.estado === "activa" ? "Activa" : "Cancelada"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <UserCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Instructor
                </p>
                <p className="text-sm text-muted-foreground">
                  {clase.coach?.nombre}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Horario</p>
                <p className="text-sm text-muted-foreground">
                  {clase.hora_inicio} - {clase.hora_fin} (
                  {clase.duracion_minutos} min)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Días</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {clase.dias_semana.split(",").map((dia) => (
                    <Badge key={dia} variant="outline" className="text-xs">
                      {dia}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Cupo Máximo
                </p>
                <p className="text-sm text-muted-foreground">
                  {clase.cupo_maximo} plazas disponibles por sesión
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
