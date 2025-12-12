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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Login successful",
        description: "Welcome back to LearnHub!",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      toast({
        title: "Login failed",
        description: "Please check your email and password and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)

    try {
      await signInWithGoogle()
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in with Google.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      const errorCode = (err as any)?.code || ""

      if (errorCode === "auth/unauthorized-domain" || errorMessage.includes("auth/unauthorized-domain")) {
        const currentDomain = typeof window !== "undefined" ? window.location.host : ""
        toast({
          title: "Google Sign-In Unavailable",
          description: `Social login requires domain authorization. Please use email/password login or add "${currentDomain}" to Firebase Console → Authentication → Settings → Authorized domains.`,
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-closed-by-user") {
        toast({
          title: "Login cancelled",
          description: "You closed the popup before completing login.",
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
          title: "Google login failed",
          description: errorMessage || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)

    try {
      await signInWithGithub()
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in with GitHub.",
        variant: "success",
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      const errorCode = (err as any)?.code || ""

      if (errorCode === "auth/unauthorized-domain" || errorMessage.includes("auth/unauthorized-domain")) {
        const currentDomain = typeof window !== "undefined" ? window.location.host : ""
        toast({
          title: "GitHub Sign-In Unavailable",
          description: `Social login requires domain authorization. Please use email/password login or add "${currentDomain}" to Firebase Console → Authentication → Settings → Authorized domains.`,
          variant: "destructive",
        })
      } else if (errorCode === "auth/popup-closed-by-user") {
        toast({
          title: "Login cancelled",
          description: "You closed the popup before completing login.",
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
          title: "GitHub login failed",
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
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
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
            <Button variant="outline" onClick={handleGoogleLogin} disabled={loading} className="w-full bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <Button variant="outline" onClick={handleGithubLogin} disabled={loading} className="w-full bg-transparent">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
