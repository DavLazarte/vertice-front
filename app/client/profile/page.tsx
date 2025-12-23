import { AppHeader } from "@/components/app-header"
import { MobileNav } from "@/components/mobile-nav"
import { ProfileForm } from "@/components/profile-form"
import { currentUser } from "@/lib/mock-data"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function ClientProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-4">
      <AppHeader userName={currentUser.name} userRole={currentUser.role} />

      <main className="container mx-auto max-w-2xl space-y-6 p-4">
        <div className="flex items-center gap-3">
          <Link href="/client">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
            <p className="text-sm text-muted-foreground">Actualiza tu información personal</p>
          </div>
        </div>

        <ProfileForm user={currentUser} />
      </main>

      <MobileNav role="client" />
    </div>
  )
}
