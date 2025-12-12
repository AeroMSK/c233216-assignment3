import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, Home, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <div className="text-center">
        <FileQuestion className="mx-auto mb-4 h-24 w-24 text-muted-foreground" />
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-balance">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground text-pretty">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/courses">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
