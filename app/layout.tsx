import '../styles/globals.scss'
import ActionBar from './profile/(actionbar)/(actionBar)'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ActionBar />
        {children}
      </body>
    </html>
  )
}
