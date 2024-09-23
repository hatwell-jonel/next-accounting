import { signOut } from '@/auth'
import React from 'react'
import { Button } from './ui/button'

const MainHeader = () => {
  return (
    <header className='shadow-sm bg-white top-0 z-50 flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8'>

      <h1>Accounting</h1>

      <form action={ async () => {
          'use server'

          await signOut({
            redirectTo: '/login',
          })
        }
      }>
        <Button variant="default" type="submit">
            Sign Out
        </Button>
      </form>
    </header>
  )
}

export default MainHeader