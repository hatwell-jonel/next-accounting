import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader'
import MainSidebar from '@/components/MainSidebar'
import React from 'react'

const MainLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <MainHeader />
        <MainSidebar />
        <main>
            {children}
        </main>
        <MainFooter />
    </div>
  )
}

export default MainLayout;