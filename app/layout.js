import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { StoreProvider, useStore } from '../app/context/store'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ApolloWrapper } from './ApolloWrapper';
import { useApollo } from './ApolloWrapper';




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <UserProvider>
        <StoreProvider>
          <body className={inter.className}>
            <ApolloWrapper>
              {/* <ApolloProvider client={client}> */}
              {/* <ApolloProvider> */}
              {/* <ApolloProvider client={apollo}> */}
              {children}
              {/* </ApolloProvider> */}
            </ApolloWrapper>
          </body>
        </StoreProvider>
      </UserProvider>
    </html>
  );
}
