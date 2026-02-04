'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { getPublicProfile } from '@/lib/api'
import { ProfileHeader } from '@/components/profile-header'
import { StatCard } from '@/components/stat-card'
import { RepoCard } from '@/components/repo-card'
import { TechStackGrid } from '@/components/tech-stack-grid'
import {
  ProfileHeaderSkeleton,
  StatCardsSkeleton,
  RepoCardsSkeleton,
  TechStackSkeleton,
} from '@/components/skeleton-loaders'
import { Code, Users, Star, GitFork } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ProfileData {
  user: any
  profile: any
  github_stats: any
}

export default function PublicProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null)
        const data = await getPublicProfile(username)
        setProfileData(data)
      } catch (err: any) {
        if (err.status === 404) {
          setError('Developer profile not found')
        } else if (err.status === 403) {
          setError('This profile is private')
        } else {
          setError(err.message || 'Failed to load profile')
        }
        setProfileData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <ProfileHeaderSkeleton />
          <StatCardsSkeleton />
          <TechStackSkeleton />
          <RepoCardsSkeleton />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Alert variant="destructive" className="bg-red-950/30 border-red-700">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return null
  }

  const { user, profile, github_stats } = profileData
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <motion.div
        className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <ProfileHeader
            name={user.name}
            username={user.github_username}
            avatar={user.github_avatar}
            bio={profile.bio}
            status={profile.status}
            location={profile.location}
            website={profile.website}
            twitter={profile.twitter}
            linkedin={profile.linkedin}
            lastGitHubSync={user.last_github_sync}
          />
        </motion.div>

        {/* GitHub Statistics */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            <h2 className="font-mono text-xl font-bold text-white">GitHub Statistics</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <StatCard
                label="Repositories"
                value={github_stats.total_repositories}
                icon={<Code className="h-6 w-6" />}
              />
              <StatCard
                label="Stars"
                value={github_stats.total_stars}
                icon={<Star className="h-6 w-6" />}
              />
              <StatCard
                label="Followers"
                value={github_stats.total_followers}
                icon={<Users className="h-6 w-6" />}
              />
              <StatCard
                label="Following"
                value={github_stats.total_following}
                icon={<Users className="h-6 w-6" />}
              />
              <StatCard
                label="Contributions"
                value={github_stats.total_contributions}
                icon={<GitFork className="h-6 w-6" />}
              />
              <StatCard
                label="Public Repos"
                value={github_stats.public_repos}
                icon={<Code className="h-6 w-6" />}
              />
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        {Object.keys(github_stats.languages).length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="space-y-4">
              <h2 className="font-mono text-xl font-bold text-white">Tech Stack</h2>
              <TechStackGrid languages={github_stats.languages} />
            </div>
          </motion.div>
        )}

        {/* Pinned Repositories */}
        {github_stats.pinned_repositories && github_stats.pinned_repositories.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="space-y-4">
              <h2 className="font-mono text-xl font-bold text-white">Featured Projects</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="space-y-4">
              <h2 className="font-mono text-xl font-bold text-white">Recent Activity</h2>
              <div className="space-y-3">
                {github_stats.recent_activity.slice(0, 5).map((activity: any, index: number) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 backdrop-blur-sm transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
                    variants={itemVariants}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-sm font-medium text-white">
                          {activity.type.replace(/Event$/, '')}
                        </p>
                        <p className="mt-1 text-sm text-zinc-400">{activity.repo}</p>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
