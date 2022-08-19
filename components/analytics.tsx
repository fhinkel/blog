import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '../lib/constants'


const GoogleAnalytics = () => {
  const url = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={url}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
