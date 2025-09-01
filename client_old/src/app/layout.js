import { Figtree, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

// Configure fonts
const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'AI Memory Manager',
  description: 'Your intelligent memory assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${poppins.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
