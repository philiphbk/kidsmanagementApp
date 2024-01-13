export const metadata = {
  title: 'Register',
  description: 'a simple app to help parents organize and monitor pickups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
