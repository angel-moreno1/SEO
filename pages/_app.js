import { ChakraProvider } from '@chakra-ui/react'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import "nprogress/nprogress.css"

// NProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => NProgress.start() )
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
