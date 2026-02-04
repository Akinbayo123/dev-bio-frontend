import { cn } from '@/lib/utils'

interface TechStackGridProps {
  languages: Record<string, number>
  maxItems?: number
}

const LANGUAGE_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  TypeScript: { bg: 'dark:bg-blue-950/40 bg-blue-100/60', text: 'dark:text-blue-300 text-blue-700', icon: 'TS' },
  JavaScript: { bg: 'dark:bg-yellow-950/40 bg-yellow-100/60', text: 'dark:text-yellow-300 text-yellow-700', icon: 'JS' },
  Python: { bg: 'dark:bg-blue-900/40 bg-blue-100/60', text: 'dark:text-blue-400 text-blue-700', icon: 'PY' },
  CSS: { bg: 'dark:bg-pink-950/40 bg-pink-100/60', text: 'dark:text-pink-300 text-pink-700', icon: 'CSS' },
  HTML: { bg: 'dark:bg-orange-950/40 bg-orange-100/60', text: 'dark:text-orange-300 text-orange-700', icon: 'HTML' },
  PHP: { bg: 'dark:bg-purple-950/40 bg-purple-100/60', text: 'dark:text-purple-300 text-purple-700', icon: 'PHP' },
  Java: { bg: 'dark:bg-red-950/40 bg-red-100/60', text: 'dark:text-red-300 text-red-700', icon: 'Java' },
  Go: { bg: 'dark:bg-cyan-950/40 bg-cyan-100/60', text: 'dark:text-cyan-300 text-cyan-700', icon: 'Go' },
  Rust: { bg: 'dark:bg-amber-900/40 bg-amber-100/60', text: 'dark:text-amber-400 text-amber-700', icon: 'RS' },
  EJS: { bg: 'dark:bg-green-950/40 bg-green-100/60', text: 'dark:text-green-300 text-green-700', icon: 'EJS' },
  SQL: { bg: 'dark:bg-red-950/40 bg-red-100/60', text: 'dark:text-red-300 text-red-700', icon: 'SQL' },
  Ruby: { bg: 'dark:bg-red-900/40 bg-red-100/60', text: 'dark:text-red-400 text-red-700', icon: 'RB' },
  Kotlin: { bg: 'dark:bg-purple-900/40 bg-purple-100/60', text: 'dark:text-purple-400 text-purple-700', icon: 'KT' },
  Swift: { bg: 'dark:bg-orange-900/40 bg-orange-100/60', text: 'dark:text-orange-400 text-orange-700', icon: 'SW' },
}

export function TechStackGrid({ languages, maxItems = 6 }: TechStackGridProps) {
  const entries = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxItems)

  if (entries.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {entries.map(([lang, count]) => {
        const colors = LANGUAGE_COLORS[lang] || {
          bg: 'dark:bg-zinc-800/40 bg-zinc-200/60',
          text: 'dark:text-zinc-300 text-zinc-700',
          icon: lang.slice(0, 2).toUpperCase(),
        }

        return (
          <div
            key={lang}
            className={cn(
              'rounded-lg border border-border p-3 text-center transition-all hover:border-primary/50',
              colors.bg
            )}
          >
            <div className={cn('text-xs font-bold', colors.text)}>{colors.icon}</div>
            <div className={cn('mt-1 text-xs', colors.text)}>{count}</div>
          </div>
        )
      })}
    </div>
  )
}
