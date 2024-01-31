import TopNavBar from "./components/TopNavBar"

export const metadata = {
  title: 'Admin',
  description: 'a simple app to help parents organize and monitor pickups',
}

export default function JcAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <TopNavBar />
        {children}
      </div>
  )
}
