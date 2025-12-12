"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, Award, Clock } from "lucide-react"
import Link from "next/link"

interface EnrolledCourse {
  id: number
  title: string
  image: string
  category: string
  progress: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching enrolled courses
    async function fetchEnrolledCourses() {
      try {
        // In a real app, you would fetch this from your backend based on user ID
        const response = await fetch("https://fakestoreapi.com/products?limit=4")
        const data = await response.json()
        const courses = data.map(
          (product: { id: number; title: string; image: string; category: string }, index: number): EnrolledCourse => ({
            id: product.id,
            title: product.title,
            image: product.image,
            category: product.category,
            progress: [25, 60, 85, 40][index], // Mock progress
          }),
        )
        setEnrolledCourses(courses)
      } catch (err) {
        console.error("[v0] Failed to fetch enrolled courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrolledCourses()
  }, [])

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-muted/40">
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
            <div className="container mx-auto px-4">
              <h1 className="mb-2 text-3xl font-bold text-balance md:text-4xl">
                Welcome back, {user?.displayName || user?.email?.split("@")[0] || "Learner"}!
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">Continue your learning journey</p>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                    <p className="text-xs text-muted-foreground">Active courses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Certificates earned</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.5</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <Button asChild variant="outline">
                    <Link href="/courses">Browse More</Link>
                  </Button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                ) : enrolledCourses.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">No enrolled courses yet</h3>
                      <p className="mb-4 text-muted-foreground">Start learning by enrolling in a course</p>
                      <Button asChild>
                        <Link href="/courses">Browse Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {enrolledCourses.map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="flex gap-4">
                          <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between py-4 pr-4">
                            <div>
                              <Badge variant="secondary" className="mb-2 text-xs">
                                {course.category}
                              </Badge>
                              <h3 className="mb-2 line-clamp-2 font-semibold">{course.title}</h3>
                            </div>
                            <div>
                              <div className="mb-1 flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-border bg-muted/20 p-3">
                          <Button asChild variant="ghost" size="sm" className="w-full">
                            <Link href={`/course/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">Keep Learning!</CardTitle>
                      <CardDescription>You're making great progress. Keep going!</CardDescription>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Complete one more lesson today to maintain your learning streak.
                  </p>
                  <Button asChild>
                    <Link href="/courses">Explore More Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
