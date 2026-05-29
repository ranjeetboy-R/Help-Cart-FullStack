import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import InternetProvider from "./InternetProvider";
import UserMenu from "./user/userComponents/UserMenu";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const metadata = {
  title: "HelpCart - Find Workers & Service Providers Easily",
  description:
    "HelpCart is a platform that connects workers and service providers with customers. Hire skilled professionals, post jobs, and get services easily in your area.",
  keywords: [
    "HelpCart",
    "hire workers",
    "service marketplace",
    "find workers online",
    "freelancers India",
    "home services",
    "skilled labor platform",
  ],
  authors: [{ name: "HelpCart Team" }],
  creator: "HelpCart",
  publisher: "HelpCart",

  openGraph: {
    title: "HelpCart - Connect Workers & Service Providers",
    description:
      "Easily find and hire skilled workers and service providers near you with HelpCart.",
    url: "https://helpcart.com",
    siteName: "HelpCart",
    type: "website",
    images: [
      {
        url: "https://helpcart.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "HelpCart Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HelpCart - Hire Workers & Services",
    description:
      "Connect with skilled workers and service providers instantly on HelpCart.",
    images: ["https://helpcart.com/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage_grotesque.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
          <InternetProvider />
          <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
