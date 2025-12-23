"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ClassSession } from "@/lib/mock-data"
import { Calendar, Clock, Users, User, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassCardProps {
  classSession: ClassSession
  showBookButton?: boolean
}

export function ClassCard({ classSession, showBookButton = false }: ClassCardProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const isFull = classSession.available === 0
  const isLowAvailability = classSession.available > 0 && classSession.available <= 3

  const handleBook = () => {
    setIsBooked(true)
    setShowDialog(false)
  }

  return (
    <>
      <Card className={cn("transition-all", isFull && "opacity-60")}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{classSession.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {classSession.modality}
                </Badge>
              </div>
              {isFull ? (
                <Badge variant="destructive" className="text-xs">
                  Completa
                </Badge>
              ) : isLowAvailability ? (
                <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 dark:text-yellow-500 text-xs">
                  Pocas plazas
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Disponible
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{classSession.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{classSession.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(classSession.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {classSession.enrolled}/{classSession.capacity}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Hora: </span>
                <span className="font-semibold text-foreground">{classSession.time}</span>
              </div>
              {showBookButton && (
                <Button
                  size="sm"
                  disabled={isFull || isBooked}
                  onClick={() => setShowDialog(true)}
                  className={cn(isBooked && "bg-primary/20 text-primary hover:bg-primary/20")}
                >
                  {isBooked ? (
                    <>
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Reservada
                    </>
                  ) : isFull ? (
                    "No disponible"
                  ) : (
                    "Reservar"
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Reserva</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Deseas reservar la clase de <strong>{classSession.name}</strong> el{" "}
              {new Date(classSession.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
              })}{" "}
              a las {classSession.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleBook}>Confirmar reserva</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
