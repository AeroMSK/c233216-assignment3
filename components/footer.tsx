import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">LearnHub</span>
            </div>
            <p className="text-sm text-muted-foreground">Empowering learners worldwide with quality education.</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          <p className="mt-2">
            Designed and Developed by <span className="font-semibold text-foreground">Musa Khan</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
