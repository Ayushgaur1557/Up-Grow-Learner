import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
   <Loader className="animate-spin h-12 w-12 text-primary"/>
   <p className="mt-4 text-lg font-semibold text-muted-foreground">Loading, please wait</p>
    </div>
  )
}

export default LoadingSpinner
