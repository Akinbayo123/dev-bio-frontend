'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getGitHubOAuthRedirectUrl, isApiConfigured } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Github, Code, Users, Zap, AlertCircle, ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react'
import { toast } from 'sonner'

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [oauthUrl, setOauthUrl] = useState<string | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [apiConfigured, setApiConfigured] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    setApiConfigured(isApiConfigured())
  }, [])

  const handleGitHubLogin = async () => {
    try {
      setLoadingAuth(true)
      setErrorMessage('')
      const response = await getGitHubOAuthRedirectUrl()
      window.location.href = response.url
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to get OAuth URL'
      console.error('Failed to get OAuth URL:', error)
      setErrorMessage(errorMsg)
      setLoadingAuth(false)
      toast.error(errorMsg)
    }
  }

  const features = [
    {
      icon: <Github className="h-6 w-6" />,
      title: 'GitHub Integration',
      description: 'Sync your GitHub stats automatically and showcase your projects',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Live Analytics',
      description: 'Track your contributions, commits, and coding activity in real-time',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Beautiful Profiles',
      description: 'Create stunning portfolios that stand out from the crowd',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Shareable Links',
      description: 'Get a professional URL to showcase your developer journey',
      gradient: 'from-green-500 to-emerald-500'
    },
  ]

  const stats = [
    { label: 'Active Developers', value: '10K+' },
    { label: 'Portfolios Created', value: '25K+' },
    { label: 'GitHub Stars', value: '50K+' },
  ]

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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px] pointer-events-none" />

      {/* Navigation */}
      <motion.nav
        className="relative border-b border-white/10 bg-slate-950/50 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur-lg opacity-50" />
              <Code className="relative h-8 w-8 text-blue-400" />
            </div>
            <span className="font-bold text-2xl bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              DevBio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10"
              onClick={handleGitHubLogin}
              disabled={loadingAuth || !apiConfigured}
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10"
              onClick={handleGitHubLogin}
              disabled={loadingAuth || !apiConfigured}
            >
              Sign In
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Configuration Error Banner */}
      {!apiConfigured && (
        <motion.div
          className="relative mx-auto max-w-7xl px-6 py-4 lg:px-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-xl border border-red-500/20 bg-red-950/30 backdrop-blur-sm p-4 text-red-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Backend API Not Configured</p>
              <p className="text-sm mt-1">
                Set the <code className="bg-red-900/50 px-2 py-1 rounded text-xs">NEXT_PUBLIC_API_URL</code> environment variable to your backend URL (e.g., http://localhost:8000/api)
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message Banner */}
      {errorMessage && (
        <motion.div
          className="relative mx-auto max-w-7xl px-6 py-4 lg:px-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-4 text-amber-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Connection Error</p>
              <p className="text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-12 text-center">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Trusted by 10,000+ developers</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
              Your Developer Story,
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 blur-2xl opacity-50" />
                <span className="relative bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Beautifully Told
                </span>
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl text-slate-300 md:text-2xl leading-relaxed">
              Transform your GitHub profile into a stunning portfolio.
              Showcase your code, contributions, and achievements with live updates.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
            <Button
              onClick={handleGitHubLogin}
              disabled={loadingAuth || !apiConfigured}
              size="lg"
              className="group relative overflow-hidden bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed h-14 px-8 text-lg font-semibold shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              <span className="relative flex items-center gap-3">
                <Github className="h-6 w-6" />
                {loadingAuth ? 'Redirecting...' : !apiConfigured ? 'Configure API First' : 'Start Building Free'}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800/50 hover:border-slate-600 backdrop-blur-sm"
            >
              View Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Profile Preview */}
        <motion.div
          className="mt-20"
          variants={itemVariants}
          animate={floatingAnimation}
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-3xl" />

            {/* Card */}
            <div className="relative rounded-2xl border border-white/10 bg-linear-to-b from-slate-900/90 to-slate-950/90 p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar with gradient border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-75" />
                  <div className="relative h-32 w-32 rounded-full bg-linear-to-br from-blue-500 via-purple-500 to-cyan-500 p-1">
                    <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                      <Code className="h-16 w-16 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Your Profile Preview</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Showcase GitHub stats, top languages, pinned repos, and activity.
                      Get a professional profile URL to share anywhere.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-2 font-mono text-sm text-slate-300">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    devbio.app/@your-username
                  </div>
                </div>
              </div>

              {/* Mini stats preview */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                {['12 Projects', '1.2K Commits', '50+ Stars'].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-white">{stat.split(' ')[0]}</div>
                    <div className="text-xs text-slate-400">{stat.split(' ')[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Shine
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Powerful features to help you create the perfect developer portfolio
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-linear-to-b from-slate-900/50 to-slate-950/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${feature.gradient} opacity-0 blur-xl transition-opacity group-hover:opacity-20`} />

              <div className="relative">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-r ${feature.gradient} mb-4 shadow-lg`}>
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-blue-950/50 via-purple-950/50 to-cyan-950/50 p-12 md:p-16 backdrop-blur-xl">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />

          <div className="relative text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers showcasing their work.
              Get started in seconds with your GitHub account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGitHubLogin}
                disabled={loadingAuth || !apiConfigured}
                size="lg"
                className="group relative overflow-hidden bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed h-14 px-8 text-lg font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <span className="relative flex items-center gap-3">
                  <Github className="h-6 w-6" />
                  {loadingAuth ? 'Redirecting...' : 'Get Started Free'}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-slate-400">
              {apiConfigured ? 'Set up in under 2 minutes' : 'Please configure your backend API to continue'}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative border-t border-white/10 bg-slate-950/50 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Code className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-lg bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                DevBio
              </span>
            </div>

            <p className="text-sm text-slate-400">
              © 2026 DevBio. Built for developers, powered by GitHub.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}