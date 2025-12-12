"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Course {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("https://fakestoreapi.com/products?limit=6")
        const data = await response.json()
        const formattedCourses = data.map(
          (product: {
            id: number
            title: string
            description: string
            image: string
            price: number
            category: string
          }) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            category: product.category,
          }),
        )
        setCourses(formattedCourses)
      } catch (err) {
        console.error("[v0] Failed to fetch courses:", err)
        setError("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl">
                Transform Your Future with Online Learning
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                Discover thousands of courses taught by expert instructors. Learn at your own pace and advance your
                career.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/courses">
                    Browse Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-muted/20 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="mb-3 h-10 w-10 text-primary" />
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="mb-3 h-10 w-10 text-primary" />
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="mb-3 h-10 w-10 text-primary" />
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Instructors</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="mb-3 h-10 w-10 text-primary" />
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">Featured Courses</h2>
              <p className="text-lg text-muted-foreground text-pretty">Start learning with our most popular courses</p>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}

            {error && (
              <div className="py-12 text-center text-red-600">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/courses">View All Courses</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
