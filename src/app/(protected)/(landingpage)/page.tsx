import { auth } from '@/auth';
import React from 'react'

const LandingPage = async () => {
  const session = await auth();

  return (
    <div>
      Main
      <div>
        {JSON.stringify(session)}
      </div>
    </div>
  )
}

export default LandingPage;