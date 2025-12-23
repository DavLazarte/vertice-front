// Mock data for the gym management app

export type UserRole = "client" | "reception" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
}

export interface Membership {
  id: string
  userId: string
  planName: string
  modality: "Mensual" | "Trimestral" | "Anual" | "Por Clase"
  status: "Activa" | "Por Vencer" | "Vencida"
  startDate: string
  endDate?: string
  remainingCredits?: number
}

export interface ClassSession {
  id: string
  name: string
  modality: string
  instructor: string
  date: string
  time: string
  duration: number
  capacity: number
  enrolled: number
  available: number
}

export interface Reservation {
  id: string
  userId: string
  classId: string
  className: string
  modality: string
  date: string
  time: string
  status: "Reservada" | "Asistida" | "Cancelada"
}

export interface Attendance {
  id: string
  userId: string
  className: string
  modality: string
  date: string
  time: string
}

// Mock current user - this would come from auth in real app
export const currentUser: User = {
  id: "1",
  name: "María González",
  email: "maria@email.com",
  phone: "+34 612 345 678",
  role: "client",
}

// Mock membership data
export const mockMembership: Membership = {
  id: "m1",
  userId: "1",
  planName: "Plan Premium",
  modality: "Mensual",
  status: "Activa",
  startDate: "2024-01-01",
  endDate: "2025-01-01",
}

// Mock class sessions
export const mockClasses: ClassSession[] = [
  {
    id: "c1",
    name: "CrossFit",
    modality: "Funcional",
    instructor: "Carlos Ruiz",
    date: "2024-12-16",
    time: "09:00",
    duration: 60,
    capacity: 15,
    enrolled: 12,
    available: 3,
  },
  {
    id: "c2",
    name: "Yoga",
    modality: "Bienestar",
    instructor: "Ana Martínez",
    date: "2024-12-16",
    time: "10:30",
    duration: 60,
    capacity: 20,
    enrolled: 18,
    available: 2,
  },
  {
    id: "c3",
    name: "Spinning",
    modality: "Cardio",
    instructor: "Pedro López",
    date: "2024-12-16",
    time: "18:00",
    duration: 45,
    capacity: 25,
    enrolled: 25,
    available: 0,
  },
  {
    id: "c4",
    name: "HIIT",
    modality: "Funcional",
    instructor: "Laura Sánchez",
    date: "2024-12-17",
    time: "07:00",
    duration: 45,
    capacity: 12,
    enrolled: 8,
    available: 4,
  },
]

// Mock reservations
export const mockReservations: Reservation[] = [
  {
    id: "r1",
    userId: "1",
    classId: "c1",
    className: "CrossFit",
    modality: "Funcional",
    date: "2024-12-16",
    time: "09:00",
    status: "Reservada",
  },
  {
    id: "r2",
    userId: "1",
    classId: "c2",
    className: "Yoga",
    modality: "Bienestar",
    date: "2024-12-15",
    time: "10:30",
    status: "Asistida",
  },
]

// Mock attendance history
export const mockAttendance: Attendance[] = [
  {
    id: "a1",
    userId: "1",
    className: "CrossFit",
    modality: "Funcional",
    date: "2024-12-14",
    time: "09:00",
  },
  {
    id: "a2",
    userId: "1",
    className: "Yoga",
    modality: "Bienestar",
    date: "2024-12-13",
    time: "10:30",
  },
  {
    id: "a3",
    userId: "1",
    className: "Spinning",
    modality: "Cardio",
    date: "2024-12-12",
    time: "18:00",
  },
]

// Mock clients for reception
export const mockClients: User[] = [
  {
    id: "1",
    name: "María González",
    email: "maria@email.com",
    phone: "+34 612 345 678",
    role: "client",
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+34 698 765 432",
    role: "client",
  },
  {
    id: "3",
    name: "Carmen Rodríguez",
    email: "carmen@email.com",
    phone: "+34 645 123 987",
    role: "client",
  },
]
