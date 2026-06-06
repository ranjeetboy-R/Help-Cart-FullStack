import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import InternetProvider from "./InternetProvider";
import RouteTracker from "./RouteTracker";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800']
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
    "carpenter",
    "technician",
    "teacher",
    "contractor",
    "painter",
    "websiteDeveloper",
    "aiAgentAutomation",
    "mechanic",
    "mobile_repair",
  ],

  authors: [{ name: "HelpCart" }],

  creator: "HelpCart",
  publisher: "HelpCart",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helpcart.vercel.app",
    siteName: "HelpCart",
    title: "HelpCart",
    description:
      "Find trusted service providers and skilled professionals near you.",
    images: [
      {
        url: "/logo.png",
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
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://helpcart.vercel.app",
  },

  verification: {
    google: "PASTE_GOOGLE_SEARCH_CONSOLE_CODE",
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
      data-scroll-behavior="smooth"
      className={`${bricolage_grotesque.className} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <RouteTracker />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />

          {children}
          <InternetProvider />
          <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
