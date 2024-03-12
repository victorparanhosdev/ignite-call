import { globalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app";
import Head from "next/head";
import '../lib/dayjs'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
globalStyles()

export default function App({Component, pageProps: {session, ...pageProps }}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
    <Head>
      <title>Ignite Call</title>
    </Head>
      <Component {...pageProps} />
    </SessionProvider>
    </QueryClientProvider>
  )
}

