"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"

interface CourseCardProps {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

export function CourseCard({ id, title, description, image, price, category }: CourseCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const favorite = isFavorite(id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(id)
    } else {
      addToFavorites(id)
    }
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        <button
          onClick={toggleFavorite}
          className="absolute right-2 top-2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-lg font-bold text-primary">${price}</span>
        </div>
        <CardTitle className="line-clamp-2 text-balance">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/course/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
