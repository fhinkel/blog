import { AppProps } from 'next/app'
import '../styles/index.css'
import "prismjs/themes/prism.css";
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';



export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
