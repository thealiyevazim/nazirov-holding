import type { PropsWithChildren } from 'react'
import Navbar from '../components/layout/Navbar'

type MainLayoutProps = PropsWithChildren

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-darkBg text-white">
      <Navbar />
      <main className="pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:pb-0">{children}</main>
    </div>
  )
}

export default MainLayout
