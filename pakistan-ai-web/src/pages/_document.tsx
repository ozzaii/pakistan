import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#065f46" />
        <meta name="description" content="A culturally aware AI chat assistant for Pakistani relationships and values" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="keywords" content="Pakistan, AI, Chat, Assistant, Cultural, Values, Relationships" />
        <meta property="og:title" content="Pakistan AI Chat" />
        <meta property="og:description" content="A culturally aware AI chat assistant for Pakistani relationships and values" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}