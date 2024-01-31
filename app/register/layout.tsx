import "../../styles/register.module.css";

export const metadata = {
  title: 'Register',
  description: 'a simple app to help parents organize and monitor pickups',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>{children}</div>
  )
}
