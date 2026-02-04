'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
} from 'lucide-react'

interface ProfileHeaderProps {
  name: string
  username: string
  avatar: string
  bio: string
  status: string
  location: string
  website: string
  twitter: string
  linkedin: string
  lastGitHubSync: string
}

export function ProfileHeader({
  name,
  username,
  avatar,
  bio,
  status,
  location,
  website,
  twitter,
  linkedin,
  lastGitHubSync,
}: ProfileHeaderProps) {
  const socialLinks = [
    {
      icon: Github,
      href: `https://github.com/${username}`,
      label: 'GitHub',
      show: !!username,
    },
    {
      icon: Twitter,
      href: `https://twitter.com/${twitter}`,
      label: 'Twitter',
      show: !!twitter,
    },
    {
      icon: Linkedin,
      href: `https://linkedin.com/in/${linkedin}`,
      label: 'LinkedIn',
      show: !!linkedin,
    },
    {
      icon: Globe,
      href: website,
      label: 'Website',
      show: !!website,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6 rounded-xl border border-border bg-gradient-to-b from-card to-card/80 p-8 backdrop-blur-sm"
    >
      <Avatar className="h-32 w-32 border-2 border-primary/30">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-3 text-center">
        <div>
          <h1 className="font-mono text-3xl font-bold text-foreground md:text-4xl">
            {name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">@{username}</p>
        </div>

        {bio && <p className="max-w-md text-foreground/90">{bio}</p>}

        {status && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">{status}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        )}
        {lastGitHubSync && (
          <p className="text-xs text-muted-foreground/70">
            Updated {new Date(lastGitHubSync).toLocaleDateString()}
          </p>
        )}
      </div>

      {socialLinks.some((link) => link.show) && (
        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-4">
          {socialLinks.map(
            (link) =>
              link.show && (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-border bg-muted/50 p-2 transition-colors hover:border-primary/50 hover:bg-primary/10"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                </motion.a>
              )
          )}
        </div>
      )}
    </motion.div>
  )
}
