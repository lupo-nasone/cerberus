import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from './components/ChatWidget';
import { LanguageProvider } from './lib/LanguageProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cerberus S.r.l. | Sicurezza sul Lavoro e Formazione Professionale",
  description: "Cerberus S.r.l. - Esperti in sicurezza sul lavoro, verifiche ispettive, gestione obblighi normativi e formazione professionale. Consulenza e servizi per aziende in tutta Italia.",
  metadataBase: new URL("https://cerberussrl.it"),
  alternates: {
    canonical: "https://cerberussrl.it",
  },
  keywords: ["sicurezza sul lavoro", "formazione professionale", "verifiche ispettive", "consulenza aziendale", "normativa sicurezza", "Cerberus", "Prato", "Toscana"],
  authors: [{ name: "Cerberus S.r.l." }],
  creator: "Cerberus S.r.l.",
  publisher: "Cerberus S.r.l.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Cerberus S.r.l. | Sicurezza sul Lavoro e Formazione Professionale",
    description: "Esperti in sicurezza sul lavoro, verifiche ispettive, gestione obblighi normativi e formazione professionale.",
    url: "https://cerberussrl.it",
    siteName: "Cerberus S.r.l.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Cerberus S.r.l. Logo",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cerberus S.r.l. | Sicurezza sul Lavoro",
    description: "Esperti in sicurezza sul lavoro, verifiche ispettive e formazione professionale.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data JSON-LD per Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cerberus S.r.l.",
    "url": "https://cerberussrl.it",
    "logo": "https://cerberussrl.it/images/logo.png",
    "description": "Esperti in sicurezza sul lavoro, verifiche ispettive, gestione obblighi normativi e formazione professionale.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Prato",
      "addressRegion": "Toscana",
      "addressCountry": "IT"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-0574-1596267",
      "contactType": "customer service",
      "email": "segreteria@cerberussrl.it",
      "availableLanguage": ["Italian", "English"]
    },
    "sameAs": []
  };

  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* force dark theme early to avoid flash-of-incorrect-theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try{
              document.documentElement.setAttribute('data-theme', 'dark');
              // initialize language from localStorage (default: it)
              var lang = (function(){
                try{ return localStorage.getItem('site-lang') || 'it' }catch(e){ return 'it' }
              })();
              document.documentElement.setAttribute('data-lang', lang);
              document.documentElement.lang = lang;
            }catch(e){}
          })();
        `}} />
        {/* LanguageProvider wraps the app so client components can access translations */}
        <LanguageProvider>
          {children}
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
