"use client"

import { useEffect, useState } from "react"
import { CourseCard } from "@/components/course-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
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
        setFilteredCourses(formattedCourses)

        const uniqueCategories = Array.from(new Set(formattedCourses.map((c: Course) => c.category)))
        setCategories(uniqueCategories)
      } catch (err) {
        console.error("[v0] Failed to fetch courses:", err)
        setError("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    let filtered = [...courses]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "price-low") {
        return a.price - b.price
      } else if (sortBy === "price-high") {
        return b.price - a.price
      }
      return 0
    })

    setFilteredCourses(filtered)
  }, [searchQuery, courses, sortBy, selectedCategory])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-muted/40 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold text-balance md:text-5xl">Explore All Courses</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Browse our complete collection of courses and find the perfect one for you
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <label htmlFor="category" className="text-sm font-medium whitespace-nowrap">
                    Category:
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "name" | "price-low" | "price-high")}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {!loading && !error && filteredCourses.length > 0 && (
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
              </p>
            )}

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
                {filteredCourses.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <p>No courses found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
