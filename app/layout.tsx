import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/navbar'
import Footer from './components/footer/footer'
import Cartprovedor from '@/provider/cartprovider'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Power Fuel',
  description: 'Suplements Store',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${poppins.className}text-slate-700`}>
        <Toaster toastOptions={{
          style: { background: "green", color: "white" },
        }} />
        <Cartprovedor>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Cartprovedor>
      </body>
    </html>
  );
}
