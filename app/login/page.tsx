import { LoginForm } from "@/components/login-form"
import { Dumbbell } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-primary">
            {/* <Dumbbell className="h-10 w-10 text-primary-foreground" /> */}
            <img src="logo.jpeg" alt="logo" className="h-32 w-32 rounded-2xl text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Vertice</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sistema de gestión</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
