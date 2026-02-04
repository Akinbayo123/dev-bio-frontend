import { ExternalLink, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepoCardProps {
  name: string
  url: string
  description?: string
  stars: number
  language?: string
  className?: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'dark:bg-blue-500/20 dark:text-blue-300 bg-blue-100 text-blue-700',
  JavaScript: 'dark:bg-yellow-500/20 dark:text-yellow-300 bg-yellow-100 text-yellow-700',
  Python: 'dark:bg-blue-600/20 dark:text-blue-400 bg-blue-100 text-blue-700',
  CSS: 'dark:bg-pink-500/20 dark:text-pink-300 bg-pink-100 text-pink-700',
  HTML: 'dark:bg-orange-500/20 dark:text-orange-300 bg-orange-100 text-orange-700',
  PHP: 'dark:bg-purple-500/20 dark:text-purple-300 bg-purple-100 text-purple-700',
  Java: 'dark:bg-red-500/20 dark:text-red-300 bg-red-100 text-red-700',
  Go: 'dark:bg-cyan-500/20 dark:text-cyan-300 bg-cyan-100 text-cyan-700',
  Rust: 'dark:bg-amber-600/20 dark:text-amber-400 bg-amber-100 text-amber-700',
  EJS: 'dark:bg-green-500/20 dark:text-green-300 bg-green-100 text-green-700',
}

export function RepoCard({
  name,
  url,
  description,
  stars,
  language,
  className,
}: RepoCardProps) {
  const repoName = name.split('/')[1] || name

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 backdrop-blur-sm transition-all hover:border-blue-500/60 hover:from-blue-500/20 hover:to-blue-600/20 hover:shadow-lg hover:shadow-blue-500/20',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-mono font-semibold text-foreground transition-colors group-hover:text-blue-500 truncate">
              {repoName}
            </h3>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-blue-500" />
          </div>
          {description && (
            <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{description}</p>
          )}
          <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              {language && (
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
                    LANGUAGE_COLORS[language] || 'dark:bg-zinc-700 dark:text-zinc-300 bg-zinc-200 text-zinc-700'
                  )}
                >
                  {language}
                </span>
              )}
            </div>
            {stars > 0 && (
              <div className="flex items-center gap-1 text-xs text-foreground/60 flex-shrink-0">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>{stars}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}
