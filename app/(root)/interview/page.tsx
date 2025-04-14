import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Interview Page
        </h3>
        <div className="relative">
          <Agent userName={user?.name} userId={user?.id} type="generate"/>
        </div>
      </div>
    </div>
  )
}

export default page