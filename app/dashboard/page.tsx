'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { getUserProfile, refreshGitHubStats } from '@/lib/api'
import { ProfileHeader } from '@/components/profile-header'
import { StatCard } from '@/components/stat-card'
import { TechStackGrid } from '@/components/tech-stack-grid'
import { RepoCard } from '@/components/repo-card'
import {
  ProfileHeaderSkeleton,
  StatCardsSkeleton,
  TechStackSkeleton,
} from '@/components/skeleton-loaders'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Code,
  Users,
  Star,
  GitFork,
  LogOut,
  Settings,
  Copy,
  CheckCircle,
  RefreshCw,
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ProfileData {
  user: any
  profile: any
  github_stats: any
}

export default function DashboardPage() {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { user, token, isLoading: authLoading, logout } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [formData, setFormData] = useState({
    bio: '',
    theme: 'dark',
    status: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    public: true,
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!authLoading && !token) {
      router.push('/')
    }
  }, [authLoading, token, router])

  useEffect(() => {
    if (!token) return

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token)
        setProfileData(data)

        // Apply theme from profile
        const userTheme = data.profile?.theme || 'dark'
        setTheme(userTheme)

        setFormData({
          bio: data.profile.bio || '',
          theme: userTheme,
          status: data.profile.status || '',
          location: data.profile.location || '',
          website: data.profile.website || '',
          twitter: data.profile.twitter || '',
          linkedin: data.profile.linkedin || '',
          public: data.profile.public !== false,
        })
      } catch (error) {
        console.error('Failed to load profile:', error)
        toast.error('Failed to load your profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [token, setTheme])

  const handleCopyProfileUrl = () => {
    if (!profileData?.user.github_username) return
    const url = `${window.location.origin}/${profileData.user.github_username}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Profile URL copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRefreshStats = async () => {
    if (!token) return
    try {
      setRefreshing(true)
      await refreshGitHubStats(token)
      toast.success('GitHub stats refresh queued')
      // Refetch profile after a delay
      setTimeout(() => {
        getUserProfile(token).then((data) => {
          setProfileData(data)
        })
      }, 2000)
    } catch (error) {
      console.error('Failed to refresh stats:', error)
      toast.error('Failed to refresh GitHub stats')
    } finally {
      setRefreshing(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      setUpdating(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message || 'Failed to update profile')
        return
      }

      const result = await response.json()
      toast.success('Profile updated successfully!')

      // Apply the selected theme immediately
      setTheme(formData.theme)

      // Refetch profile
      const profileResponse = await getUserProfile(token)
      setProfileData(profileResponse)
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <ProfileHeaderSkeleton />
          <StatCardsSkeleton />
          <TechStackSkeleton />
        </div>
      </div>
    )
  }

  if (!profileData) {
    return null
  }

  const { user: profileUser, profile, github_stats } = profileData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="border-b border-border bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="font-mono text-xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mx-auto max-w-6xl space-y-6 sm:space-y-8 md:space-y-12 px-3 sm:px-4 py-4 sm:py-8 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <ProfileHeader
            name={profileUser.name}
            username={profileUser.github_username}
            avatar={profileUser.github_avatar}
            bio={profile.bio}
            status={profile.status}
            location={profile.location}
            website={profile.website}
            twitter={profile.twitter}
            linkedin={profile.linkedin}
            lastGitHubSync={profileUser.last_github_sync}
          />
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <Button
            onClick={handleCopyProfileUrl}
            variant="outline"
            className="border-border text-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/50 bg-transparent transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Profile URL
              </>
            )}
          </Button>

          <Button
            onClick={handleRefreshStats}
            disabled={refreshing}
            variant="outline"
            className="border-border text-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/50 bg-transparent transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Stats'}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-border text-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/50 bg-transparent transition-colors"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border bg-card max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full rounded-lg\">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg font-bold text-card-foreground\">Edit Profile</DialogTitle>
                <DialogDescription className="text-muted-foreground">Update your profile information</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateProfile} className="space-y-3 sm:space-y-4 md:space-y-6 py-4\">
                {/* Bio Section */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Status Section */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground font-medium">Status</Label>
                  <Input
                    id="status"
                    placeholder="e.g., Open to opportunities"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Location & Theme */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-end\">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="location" className="text-foreground font-medium">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="h-10 w-full mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="theme" className="text-foreground font-medium">Theme</Label>
                    <Select value={formData.theme} onValueChange={(value) =>
                      setFormData({ ...formData, theme: value })
                    }>
                      <SelectTrigger className="h-10 w-full mt-2 border-border bg-input text-foreground focus:border-primary focus:ring-primary/20 py-4 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-card">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Website Section */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-foreground font-medium">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Social Media */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4\">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-foreground font-medium">Twitter</Label>
                    <Input
                      id="twitter"
                      placeholder="username"
                      value={formData.twitter}
                      onChange={(e) =>
                        setFormData({ ...formData, twitter: e.target.value })
                      }
                      className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-foreground font-medium">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="profile"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Public Profile Checkbox */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                  <input
                    type="checkbox"
                    id="public"
                    checked={formData.public}
                    onChange={(e) =>
                      setFormData({ ...formData, public: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-border bg-input cursor-pointer"
                  />
                  <Label htmlFor="public" className="cursor-pointer text-foreground font-medium">
                    Make profile public
                  </Label>
                </div>

                {/* Save Button */}
                <Button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 mt-8"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>


        {/* GitHub Statistics */}
        <motion.div variants={itemVariants}>
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h2 className="font-mono text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">GitHub Statistics</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <StatCard
                label="Repositories"
                value={github_stats.total_repositories}
                icon={<Code className="h-6 w-6" />}
                color="blue"
              />
              <StatCard
                label="Stars"
                value={github_stats.total_stars}
                icon={<Star className="h-6 w-6" />}
                color="amber"
              />
              <StatCard
                label="Followers"
                value={github_stats.total_followers}
                icon={<Users className="h-6 w-6" />}
                color="purple"
              />
              <StatCard
                label="Following"
                value={github_stats.total_following}
                icon={<Users className="h-6 w-6" />}
                color="pink"
              />
              <StatCard
                label="Contributions"
                value={github_stats.total_contributions}
                icon={<GitFork className="h-6 w-6" />}
                color="cyan"
              />
              <StatCard
                label="Public Repos"
                value={github_stats.public_repos}
                icon={<Code className="h-6 w-6" />}
                color="green"
              />
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        {Object.keys(github_stats.languages).length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="space-y-2 sm:space-y-3 md:space-y-4\">
              <h2 className="font-mono text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Tech Stack</h2>
              <TechStackGrid languages={github_stats.languages} />
            </div>
          </motion.div>
        )}

        {/* Pinned Repositories / Featured Projects */}
        {github_stats.pinned_repositories && github_stats.pinned_repositories.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h2 className="font-mono text-lg sm:text-xl font-bold bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Featured Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {github_stats.pinned_repositories.map((repo: any, index: number) => (
                  <RepoCard
                    key={index}
                    name={repo.name}
                    url={repo.url}
                    description={repo.description}
                    stars={repo.stars}
                    language={repo.language}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {github_stats.recent_activity && github_stats.recent_activity.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h2 className="font-mono text-lg sm:text-xl font-bold bg-linear-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent\">Recent Activity</h2>
              <div className="space-y-2 sm:space-y-3\">
                {github_stats.recent_activity.slice(0, 5).map((activity: any, index: number) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-indigo-500/30 bg-linear-to-br from-indigo-500/10 to-blue-500/10 p-4 backdrop-blur-sm transition-all hover:border-indigo-500/60 hover:bg-indigo-500/20"
                    variants={itemVariants}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-sm font-medium text-indigo-400">
                          {activity.type.replace(/Event$/, '')}
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">{activity.repo}</p>
                      </div>
                      <p className="text-xs text-muted-foreground/60">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Public Profile Link */}
        {profile.public && (
          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-4 backdrop-blur-sm transition-all hover:border-green-500/60 hover:from-green-500/20"
          >
            <Alert className="border-green-500/30 bg-transparent">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <AlertDescription className="text-foreground/80">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Your profile is public!</span> Share this link:
                  </div>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <code className="flex-1 break-all rounded bg-green-500/20 dark:bg-green-950/50 px-2.5 py-2 text-xs sm:text-sm font-mono text-green-700 dark:text-green-300 overflow-x-auto">
                      {`${window.location.origin}/${profileUser.github_username}`}
                    </code>
                    <Button
                      onClick={handleCopyProfileUrl}
                      size="sm"
                      variant="outline"
                      className="border-green-500/50 text-green-700 dark:text-green-300 hover:bg-green-500/20 dark:hover:bg-green-500/10 flex-shrink-0 whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
