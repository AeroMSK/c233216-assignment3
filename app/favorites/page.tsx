"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { CourseCard } from "@/components/course-card"
import { useFavorites } from "@/contexts/favorites-context"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Course {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFavoriteCourses() {
      if (favorites.length === 0) {
        setLoading(false)
        return
      }

      try {
        const coursePromises = favorites.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((r) => r.json()),
        )
        const coursesData = await Promise.all(coursePromises)
        setCourses(coursesData)
      } catch (error) {
        console.error("[v0] Failed to fetch favorite courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteCourses()
  }, [favorites])

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-muted/40 py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                <h1 className="text-4xl font-bold text-balance md:text-5xl">My Favorites</h1>
              </div>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Courses you've marked as favorites for quick access
              </p>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : favorites.length === 0 ? (
                <div className="py-12 text-center">
                  <Heart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h2 className="mb-2 text-2xl font-semibold">No favorites yet</h2>
                  <p className="mb-6 text-muted-foreground">Start adding courses to your favorites to see them here</p>
                  <Button asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {courses.length} {courses.length === 1 ? "course" : "courses"} in your favorites
                  </p>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {courses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
