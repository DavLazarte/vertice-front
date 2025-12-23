export interface Socio {
  id: string
  nombre: string
  email: string
  telefono: string
  direccion?: string
  fechaNacimiento?: string
  foto?: string
  dni?: string
  planId?: string
  planNombre: string
  estado: "activo" | "inactivo" | "vencido"
  fechaVencimiento?: string
  fechaInicio?: string
  tieneUsuario?: boolean
  userId?: string
  tipo_membresia?: string
  creditos_restantes?: number
}

export interface Membresia {
  id: string
  idpersona: string
  idservicio: string
  id_local: string
  tipo: "fecha" | "creditos"
  fecha_inicio: string
  fecha_fin?: string
  creditos_totales?: number
  creditos_restantes?: number
  estado: "activa" | "vencida" | "por_vencer" | "cancelada"
  socio?: Socio
  plan?: Plan
}

export interface Plan {
  id: string
  nombre: string
  descripcion: string
  precio: number
  tipo_servicio: "plan" | "clase" | "servicio_general"
  duracion_dias?: number
  creditos?: number
  estado: boolean
  // Helper for UI
  tipo_plan?: "fecha" | "creditos" 
}

export interface Clase {
  id: string
  nombre: string
  instructorId: string
  instructorNombre: string
  diaSemana: string[]
  horaInicio: string
  duracion: number
  cupoMaximo: number
  descripcion: string
  imagen?: string
  estado: "activa" | "cancelada"
  inscritos: number
}

export interface Instructor {
  id: string
  nombre: string
  email: string
  telefono: string
  direccion?: string
  foto?: string
  especialidades: string[]
  biografia: string
  estado: "activo" | "inactivo"
  clasesAsignadas: number
}

export interface Asistencia {
  id: string
  socioId: string
  socioNombre: string
  claseId?: string
  claseNombre?: string
  fecha: string
  horaEntrada: string
  horaSalida?: string
  tipo: "clase" | "libre"
}

export interface Pago {
  id: string
  socioId: string
  socioNombre: string
  concepto: string
  monto: number
  metodoPago: "efectivo" | "tarjeta" | "transferencia"
  estado: "pagado" | "pendiente" | "vencido"
  fecha: string
  comprobante?: string
}
