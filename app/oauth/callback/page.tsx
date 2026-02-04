'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Spinner } from '@/components/ui/spinner'

export default function OAuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { isAuthenticated, isLoading } = useAuth()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = searchParams.get('token')
        const provider = searchParams.get('provider')
        const errorParam = searchParams.get('error')

        if (errorParam) {
            setError(errorParam)
            return
        }

        if (!token || !provider) {
            setError('Missing authentication parameters')
            return
        }

        // Wait for auth to process and then redirect to dashboard
        if (isAuthenticated && !isLoading) {
            router.push('/dashboard')
        }
    }, [searchParams, isAuthenticated, isLoading, router])

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <Spinner />
                <p className="text-gray-600">Completing authentication...</p>
            </div>
        </div>
    )
}
