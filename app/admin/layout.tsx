import TopNavBar from "./components/TopNavBar"

export const metadata = {
  title: 'Admin',
  description: 'a simple app to help parents organize and monitor pickups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
      </body>
    </html>
  )
}
