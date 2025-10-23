'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <h2 className="text-3xl font-semibold mt-4">Something went wrong!</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        {error.message || "An unexpected error occurred. Please try again later."}
      </p>
      <Button
        onClick={
          // Attempt to recover by re-rendering the segment
          () => reset()
        }
        className="mt-8"
      >
        Try again
      </Button>
    </div>
  )
}