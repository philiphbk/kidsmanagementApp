import styles from "../../styles/register.module.css";

export const metadata = {
  title: 'Kids Pickup App Registration',
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
