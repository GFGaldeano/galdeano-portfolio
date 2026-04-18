// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gustavo Galdeano | Portfolio Espacial',
  description: 'Full Stack Engineer & AI Architect - Portfolio profesional con efectos espaciales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
