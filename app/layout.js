"use client"

import "@/styles/globals.sass"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ModalProvider } from "./providers/modalContext"

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ModalProvider>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </ModalProvider>
    </QueryClientProvider>
  )
}
