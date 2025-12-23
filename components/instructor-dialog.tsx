"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Instructor } from "@/lib/types";

interface InstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructor?: Instructor;
  onSave: (instructor: any) => void; // Relaxed type for simplicity
}

export function InstructorDialog({
  open,
  onOpenChange,
  instructor,
  onSave,
}: InstructorDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    estado: "activo" as Instructor["estado"],
  });

  useEffect(() => {
    if (instructor) {
      setFormData({
        nombre: instructor.nombre,
        email: instructor.email,
        telefono: instructor.telefono,
        direccion: instructor.direccion || "",
        estado: instructor.estado,
      });
    } else {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        estado: "activo",
      });
    }
  }, [instructor, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate small delay if needed or standard API flow
    // No extra fields mapping needed
    const instructorData = {
      ...formData,
      foto: null, // O manejar foto real más tarde
    };

    if (instructor) {
      await onSave({ ...instructorData, id: instructor.id });
    } else {
      await onSave(instructorData);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {instructor ? "Editar Instructor" : "Nuevo Instructor"}
          </DialogTitle>
          <DialogDescription>
            {instructor
              ? "Actualiza la información del instructor"
              : "Completa los datos para registrar un nuevo instructor"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              type="tel"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) =>
                setFormData({ ...formData, direccion: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado *</Label>
            <Select
              value={formData.estado}
              onValueChange={(value: Instructor["estado"]) =>
                setFormData({ ...formData, estado: value })
              }
            >
              <SelectTrigger id="estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : instructor ? (
                "Actualizar"
              ) : (
                "Crear Instructor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
