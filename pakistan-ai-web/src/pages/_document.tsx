import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#065f46" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}