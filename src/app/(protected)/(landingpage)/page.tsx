import { auth } from '@/auth';
import React from 'react'
import {UserData} from "./_server";

const LandingPage = async () => {
  const session = await auth();

  return (
    <div>
      Main
      <div>
        {JSON.stringify(session)}
        <UserData />
      </div>
    </div>
  )
}

export default LandingPage;