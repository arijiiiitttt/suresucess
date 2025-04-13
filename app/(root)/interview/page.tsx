import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Interview Page
        </h3>
        <div className="relative">
          <Agent userName="You" userId="user1" type="generate"/>
        </div>
      </div>
    </div>
  )
}

export default page