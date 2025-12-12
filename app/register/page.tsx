"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      toast({
        title: "Account created successfully",
        description: "Welcome to LearnHub! Your learning journey begins now.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      toast({
        title: "Registration failed",
        description: "This email may already be in use. Please try a different email.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)

    try {
      console.log("[v0] Starting Google signup...")
      await signInWithGoogle()
      console.log("[v0] Google signup completed, redirecting...")
      toast({
        title: "Welcome to LearnHub!",
        description: "Your account has been created successfully.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      console.error("[v0] Google signup error:", err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      const errorCode = (err as any)?.code || ""

      if (errorCode === "auth/unauthorized-domain" || errorMessage.includes("auth/unauthorized-domain")) {
        const currentDomain = typeof window !== "undefined" ? window.location.hostname : ""
        toast({
          title: "Domain Not Authorized",
          description: `Please add "${currentDomain}" to Firebase Console → Authentication → Settings → Authorized domains`,
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-closed-by-user") {
        toast({
          title: "Sign up cancelled",
          description: "You closed the popup before completing sign up.",
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-blocked") {
        toast({
          title: "Popup blocked",
          description: "Please allow popups for this site to sign in with Google.",
          variant: "destructive",
        })
      } else if (
        errorCode === "auth/configuration-not-found" ||
        errorMessage.includes("auth/configuration-not-found")
      ) {
        toast({
          title: "Google Sign-In Not Configured",
          description: "Please enable Google authentication in Firebase Console → Authentication → Sign-in method",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Google signup failed",
          description: errorMessage || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSignup = async () => {
    setLoading(true)

    try {
      console.log("[v0] Starting GitHub signup...")
      await signInWithGithub()
      console.log("[v0] GitHub signup completed, redirecting...")
      toast({
        title: "Welcome to LearnHub!",
        description: "Your account has been created successfully.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      console.error("[v0] GitHub signup error:", err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      const errorCode = (err as any)?.code || ""

      if (errorCode === "auth/unauthorized-domain" || errorMessage.includes("auth/unauthorized-domain")) {
        const currentDomain = typeof window !== "undefined" ? window.location.hostname : ""
        toast({
          title: "Domain Not Authorized",
          description: `Please add "${currentDomain}" to Firebase Console → Authentication → Settings → Authorized domains`,
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-closed-by-user") {
        toast({
          title: "Sign up cancelled",
          description: "You closed the popup before completing sign up.",
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-blocked") {
        toast({
          title: "Popup blocked",
          description: "Please allow popups for this site to sign in with GitHub.",
          variant: "destructive",
        })
      } else if (
        errorCode === "auth/configuration-not-found" ||
        errorMessage.includes("auth/configuration-not-found")
      ) {
        toast({
          title: "GitHub Sign-In Not Configured",
          description: "Please enable GitHub authentication in Firebase Console → Authentication → Sign-in method",
          variant: "destructive",
        })
      } else {
        toast({
          title: "GitHub signup failed",
          description: errorMessage || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">Start your learning journey today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" onClick={handleGoogleSignup} disabled={loading} className="w-full bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
            <Button variant="outline" onClick={handleGithubSignup} disabled={loading} className="w-full bg-transparent">
              <Github className="mr-2 h-4 w-4" />
              Sign up with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
