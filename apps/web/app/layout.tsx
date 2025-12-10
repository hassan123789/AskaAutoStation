import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { JsonLd } from "./components/JsonLd";
import "./globals.css";

const SITE_URL = "https://aska-auto-station-web.vercel.app";
const SITE_NAME = "アスカオートステーション";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a5f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  title: {
    default: `${SITE_NAME} | さいたま市緑区で25年 車検・整備・中古車`,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "さいたま市緑区で25年の実績。車検・整備・修理・板金・中古車販売・買取。Google評価★5.0。お見積もり無料。080-3250-6741（社長直通）",
  keywords: [
    "車検",
    "さいたま市",
    "緑区",
    "車検費用",
    "自動車整備",
    "中古車",
    "板金",
    "修理",
    "アスカオートステーション",
    "上野田",
    "東川口",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | さいたま市緑区の車検・整備・中古車`,
    description:
      "さいたま市緑区で25年。車検費用シミュレーション対応。Google評価★5.0。まずはお電話ください。",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} - さいたま市緑区の車検・整備`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | さいたま市緑区の車検・整備`,
    description: "さいたま市緑区で25年。車検・整備・中古車販売。Google評価★5.0。",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "V1-keVq1sImNfHStAjHPsSXQ_5Z5JABh8dJnq3zkDlU",
  },
  category: "automotive",
};

function Header() {
  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold">
            <Image
              src="/images/logo.png"
              alt="アスカオートステーション"
              width={48}
              height={48}
              className="rounded"
              priority
            />
            <span className="hidden sm:inline">アスカオートステーション</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/inspection" className="hover:underline">
              車検費用
            </Link>
            <a
              href="https://www.carsensor.net/shop/saitama/313920001/stocklist/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              中古車在庫
            </a>
            <a
              href="https://maps.app.goo.gl/eNapSkTPYUf55xjq9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              アクセス
            </a>
            <a
              href="https://www.instagram.com/askaautostation/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              📷 Instagram
            </a>
          </nav>
          <a
            href="tel:08032506741"
            className="cta-phone-pulse rounded-full bg-[#e8a83e] px-4 py-2 font-semibold text-[#1e3a5f] transition hover:bg-gold-light"
          >
            📞 電話する
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#152a45] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="アスカオートステーション"
                width={56}
                height={56}
                className="rounded"
              />
              <h3 className="text-lg font-bold">アスカオートステーション</h3>
            </div>
            <p className="text-sm text-gray-300">
              〒336-0977
              <br />
              埼玉県さいたま市緑区上野田678-1
            </p>
            <p className="mt-2">
              <a href="tel:080-3250-6741" className="text-accent hover:underline">
                📞 080-3250-6741
              </a>
              <span className="ml-2 text-sm text-gray-400">(社長直通)</span>
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">サービス</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/inspection" className="hover:text-white">
                  車検
                </Link>
              </li>
              <li>
                <a href="tel:08032506741" className="hover:text-white">
                  整備・修理（📞電話）
                </a>
              </li>
              <li>
                <a
                  href="https://www.carsensor.net/shop/saitama/313920001/stocklist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  中古車販売 (カーセンサー)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">アクセス・SNS</h3>
            <div className="space-y-2">
              <a
                href="https://maps.app.goo.gl/eNapSkTPYUf55xjq9"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white"
              >
                📍 Googleマップで見る
              </a>
              <a
                href="https://www.instagram.com/askaautostation/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white"
              >
                📷 Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} アスカオートステーション All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <GoogleAnalytics />
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
