"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, Pencil } from "lucide-react";
import type { Instructor } from "@/lib/types";

interface InstructorDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: Instructor | null;
  onEdit: (instructor: Instructor) => void;
}

export function InstructorDetailDialog({
  open,
  onOpenChange,
  instructor,
  onEdit,
}: InstructorDetailDialogProps) {
  if (!instructor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Detalle del Instructor</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(instructor)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={instructor.foto || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {instructor.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                {instructor.nombre}
              </h3>
              <div className="mt-2">
                <Badge
                  variant={
                    instructor.estado === "activo" ? "default" : "secondary"
                  }
                >
                  {instructor.estado === "activo" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              Información de Contacto
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{instructor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{instructor.telefono}</span>
              </div>
              {instructor.direccion && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-4 w-4 flex items-center justify-center text-muted-foreground">
                    📍
                  </span>
                  <span className="text-foreground">
                    {instructor.direccion}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Sections removed: Especialidades and Biografía */}

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Clases Asignadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {instructor.clasesAsignadas}
              </div>
              <p className="text-xs text-muted-foreground">
                clases actualmente asignadas
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
