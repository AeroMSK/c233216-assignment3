"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { ArrowLeft, Star, Clock, Users, Award, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface CourseDetails {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
  rating: {
    rate: number
    count: number
  }
}

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const { toast } = useToast()
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
        if (!response.ok) {
          throw new Error("Course not found")
        }
        const data = await response.json()
        setCourse(data)
      } catch (err) {
        console.error("[v0] Failed to fetch course details:", err)
        setError("Failed to load course details")
        toast({
          title: "Error loading course",
          description: "Failed to load course details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCourseDetails()
    }
  }, [params.id, toast])

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in this course.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setEnrolling(true)
    // Simulate enrollment
    setTimeout(() => {
      setEnrolling(false)
      toast({
        title: "Successfully enrolled!",
        description: `You've been enrolled in ${course?.title}. Start learning now!`,
        variant: "success",
      })
      router.push("/dashboard")
    }, 1000)
  }

  const toggleFavorite = () => {
    if (!course) return
    if (isFavorite(course.id)) {
      removeFromFavorites(course.id)
      toast({
        title: "Removed from favorites",
        description: "Course removed from your favorites.",
      })
    } else {
      addToFavorites(course.id)
      toast({
        title: "Added to favorites",
        description: "Course saved to your favorites!",
        variant: "success",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-lg text-destructive">{error || "Course not found"}</p>
            <Button asChild>
              <Link href="/courses">Back to Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const favorite = isFavorite(course.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-muted/40 py-8">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge>{course.category}</Badge>
                    <Button variant="ghost" size="sm" onClick={toggleFavorite} className="gap-2">
                      <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
                      {favorite ? "Saved" : "Save"}
                    </Button>
                  </div>
                  <h1 className="mb-4 text-4xl font-bold text-balance">{course.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating.rate}</span>
                      <span>({course.rating.count} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>2,456 students</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-lg">
                  <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full object-cover" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold">About this course</h2>
                    <p className="leading-relaxed text-muted-foreground">{course.description}</p>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="mb-4 text-xl font-bold">What you'll learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>Master the fundamental concepts and best practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>Build real-world projects to strengthen your portfolio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>Gain practical skills valued by employers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>Get lifetime access to all course materials</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="mb-2 text-3xl font-bold text-primary">${course.price}</div>
                      <p className="text-sm text-muted-foreground">One-time payment, lifetime access</p>
                    </div>

                    <Button className="mb-4 w-full" size="lg" onClick={handleEnroll} disabled={enrolling}>
                      {enrolling ? "Enrolling..." : "Enroll Now"}
                    </Button>

                    <div className="space-y-3 border-t border-border pt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Self-paced learning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Expert instructor support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
