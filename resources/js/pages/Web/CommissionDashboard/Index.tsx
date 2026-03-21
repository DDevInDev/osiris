import { Head } from '@inertiajs/react'

import Navbar from '@/components/Web/Navbar'
import Footer from '@/components/Web/Footer'

import DashboardHero from './Partials/DashboardHero'
import StatsSection from './Partials/StatsSection'
import ChartsSection from './Partials/ChartsSection'
import RecentClientsCard from './Partials/RecentClientsCard'
import RecentProjectsCard from './Partials/RecentProjectsCard'

import { CommissionDashboardProps } from './types'

export default function CommissionDashboardIndex({
  stats,
  charts,
  recentClients,
  recentProjects,
  commissioner,
  viewer,
  filters,
  commissioners,
}: CommissionDashboardProps) {
  return (
    <>
      <Head title="Dashboard de comisión" />

      <div className="min-h-screen bg-[#050816] text-white">
        <Navbar />

        <main className="relative overflow-hidden pt-36">
          <div className="absolute top-24 left-[-120px] h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[35%] right-[-120px] h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-pink-500/10 blur-[140px]" />

          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <DashboardHero
              commissioner={commissioner}
              viewer={viewer}
              filters={filters}
              commissioners={commissioners}
            />

            <StatsSection stats={stats} />

            <ChartsSection charts={charts} />

            <section className="mb-10 grid gap-6 lg:grid-cols-2">
              <RecentClientsCard recentClients={recentClients} />
              <RecentProjectsCard recentProjects={recentProjects} />
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}