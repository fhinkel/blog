import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Script from 'next/script'
import {GA_MEASUREMENT_ID} from '../lib/constants'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={src}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${GA_MEASUREMENT_ID});
        `}
      </Script>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
