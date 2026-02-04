import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  className?: string
  color?: 'blue' | 'purple' | 'pink' | 'amber' | 'cyan' | 'green'
}

const colorConfig = {
  blue: { border: 'border-blue-500/30', bg: 'from-blue-500/10 to-blue-600/10', icon: 'text-blue-400', hover: 'hover:border-blue-500/60 hover:from-blue-500/20' },
  purple: { border: 'border-purple-500/30', bg: 'from-purple-500/10 to-purple-600/10', icon: 'text-purple-400', hover: 'hover:border-purple-500/60 hover:from-purple-500/20' },
  pink: { border: 'border-pink-500/30', bg: 'from-pink-500/10 to-pink-600/10', icon: 'text-pink-400', hover: 'hover:border-pink-500/60 hover:from-pink-500/20' },
  amber: { border: 'border-amber-500/30', bg: 'from-amber-500/10 to-amber-600/10', icon: 'text-amber-400', hover: 'hover:border-amber-500/60 hover:from-amber-500/20' },
  cyan: { border: 'border-cyan-500/30', bg: 'from-cyan-500/10 to-cyan-600/10', icon: 'text-cyan-400', hover: 'hover:border-cyan-500/60 hover:from-cyan-500/20' },
  green: { border: 'border-green-500/30', bg: 'from-green-500/10 to-green-600/10', icon: 'text-green-400', hover: 'hover:border-green-500/60 hover:from-green-500/20' },
}

export function StatCard({ label, value, icon, className, color = 'blue' }: StatCardProps) {
  const colors = colorConfig[color]

  return (
    <div
      className={cn(
        `rounded-lg border bg-gradient-to-br backdrop-blur-sm transition-all ${colors.border} ${colors.bg} ${colors.hover} p-4`,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
        </div>
        {icon && <div className={`ml-4 ${colors.icon}`}>{icon}</div>}
      </div>
    </div>
  )
}
