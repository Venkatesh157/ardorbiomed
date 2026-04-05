import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import AnnouncementBar from '#/components/layout/AnnouncementBar'
import Navbar from '#/components/layout/Navbar'
import Footer from '#/components/layout/Footer'
import WhatsAppButton from '#/components/layout/WhatsAppButton'
import { CartProvider } from '#/components/cart/CartProvider'
import { ToastProvider } from '#/components/ui/Toast'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Ardor Biomed | Natural Coconut-Derived Biomedical Products',
      },
      {
        name: 'description',
        content:
          'Ardor Biomed specializes in coconut-derived biomedical products — wound care, cosmeceuticals, and nutraceuticals. DPIIT registered, Govt of India funded. Shop from Pollachi, Tamil Nadu.',
      },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:title',
        content: 'Ardor Biomed | Natural Coconut-Derived Biomedical Products',
      },
      {
        property: 'og:description',
        content:
          'Pioneering biomedical solutions with innovation and excellence. Coconut-derived wound care, skincare, and supplements.',
      },
      { property: 'og:site_name', content: 'Ardor Biomed' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Ardor Biomed | Natural Coconut-Derived Biomedical Products',
      },
      {
        name: 'twitter:description',
        content:
          'Pioneering biomedical solutions with innovation and excellence. Coconut-derived wound care, skincare, and supplements.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  )

  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Organization structured data — content is static/hardcoded, not user-supplied */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ardor Biomed India PVT LTD',
              url: 'https://ardorbiomed.com',
              description: 'Pioneering coconut-derived biomedical solutions with innovation and excellence.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Unit No.9, Sakthi Industrial Estate, Udumalpet Road',
                addressLocality: 'Pollachi',
                addressRegion: 'Tamil Nadu',
                postalCode: '642003',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9488828080',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body
        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
        className="antialiased"
      >
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <ToastProvider>
              {/* Skip to main content for keyboard users */}
              <a
                href="#hero"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#6fc54d] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
              >
                Skip to main content
              </a>
              <AnnouncementBar />
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
            </ToastProvider>
          </CartProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
