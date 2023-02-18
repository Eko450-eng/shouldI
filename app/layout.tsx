'use client'
import '../styles/globals.scss'
import Background from './Background'
import ActionBar from './profile/(actionbar)/(actionBar)'
import { MantineProvider } from '@mantine/core'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <MantineProvider theme={{
          colorScheme: "dark"
        }} withNormalizeCSS withGlobalStyles>
          <ActionBar />
          {/* <Background /> */}
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
