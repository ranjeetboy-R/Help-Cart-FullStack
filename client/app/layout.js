import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import InternetProvider from "./InternetProvider";
import RouteTracker from "./RouteTracker";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://helpcart.vercel.app"),

  title: {
    default: "HelpCart",
    template: "%s | HelpCart",
  },

  description:
    "Find trusted service providers and skilled professionals near you.",

  keywords: [
    "HelpCart",
    "service provider",
    "local services",
    "electrician",
    "plumber",
    "technician",
    "teacher",
    "contractor",
  ],

  openGraph: {
    type: "website",
    url: "https://helpcart.vercel.app",
    siteName: "HelpCart",
    title: "HelpCart",
    description:
      "Find trusted service providers and skilled professionals near you.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HelpCart",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HelpCart",
    description:
      "Find trusted service providers and skilled professionals near you.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HelpCart",
  url: "https://helpcart.vercel.app",
  logo: "https://helpcart.vercel.app/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage_grotesque.className} scroll-smooth antialiased`}
    >
      <head>
        {/* ⚡ LCP OPTIMIZATION - ONLY CRITICAL IMAGES */}
        <link rel="preload" as="image" href="/expert.png" />
        <link rel="preload" as="image" href="/logo.png" />

        {/* ⚡ OPTIONAL: if using external images */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>

      <body className="min-h-screen flex flex-col bg-white">
        {/* GOOGLE AUTH PROVIDER (kept minimal impact) */}
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {/* ⚡ route tracking (keep lightweight) */}
          <RouteTracker />

          {/* JSON-LD structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />

          {/* MAIN APP */}
          <div className="flex-1">{children}</div>

          {/* GLOBAL PROVIDERS */}
          <InternetProvider />
          <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}