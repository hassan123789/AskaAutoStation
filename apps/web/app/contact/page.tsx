import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://aska-auto-station-web.vercel.app";

export const metadata: Metadata = {
  title: "お問い合わせ・アクセス | アスカオートステーション",
  description:
    "アスカオートステーションへのお問い合わせ。さいたま市緑区上野田678-1。国道463号線「上野田」交差点すぐ。車検・整備・修理・板金・中古車のご相談は080-3250-6741（社長直通）まで。",
  keywords: [
    "アスカオートステーション",
    "さいたま市 車検",
    "緑区 整備",
    "上野田 自動車",
    "東川口 車検",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "お問い合わせ・アクセス | アスカオートステーション",
    description: "さいたま市緑区上野田678-1。車検・整備・中古車のご相談はお電話で。",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

// ===== 会社情報（定数） =====
const COMPANY = {
  name: "アスカオートステーション",
  phone: "080-3250-6741",
  phoneTel: "tel:08032506741",
  address: "〒336-0977 埼玉県さいたま市緑区上野田678-1",
  hours: "9:00〜18:00",
  googleMapUrl: "https://maps.app.goo.gl/eNapSkTPYUf55xjq9",
  carsensorUrl: "https://www.carsensor.net/shop/saitama/313920001/",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <section className="bg-[#1e3a5f] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">お問い合わせ</h1>
          <p className="mt-2 text-gray-300">お気軽にご連絡ください</p>
        </div>
      </section>

      {/* コンテンツ */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* 電話が一番！ */}
          <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#1e3a5f]">
              📞 お電話でのお問い合わせ
            </h2>
            <p className="mb-6 text-center text-gray-600">
              車検・整備・修理・板金・中古車のご相談は
              <br />
              お電話が一番スムーズです
            </p>
            <a
              href={COMPANY.phoneTel}
              className="cta-phone-pulse mx-auto block max-w-md rounded-xl bg-[#c78c1e] py-6 text-center text-3xl font-bold text-[#1e3a5f] transition hover:bg-[#d9a43a]"
            >
              📞 {COMPANY.phone}
            </a>
            <p className="mt-4 text-center text-gray-500">
              社長直通 ・ {COMPANY.hours}
            </p>
          </div>

          {/* 来店 */}
          <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#1e3a5f]">
              🚗 ご来店
            </h2>
            <div className="mb-6">
              <div className="h-64 overflow-hidden rounded-xl bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1618.5!2d139.6940182981449!3d35.91137022089156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c1e6d1a3e9fd%3A0x8b8b8b8b8b8b8b8b!2z44Ki44K544Kr44Kq44O844OI44K544OG44O844K344On44Oz!5e0!3m2!1sja!2sjp!4v1733570400000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="アスカオートステーション 地図"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="mb-2 text-lg font-semibold">{COMPANY.name}</p>
              <p className="text-gray-600">{COMPANY.address}</p>
              <p className="text-gray-600">営業時間: {COMPANY.hours}</p>
              <a
                href={COMPANY.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-[#1e3a5f] px-6 py-3 text-white transition hover:bg-[#2d4a6f]"
              >
                📍 Googleマップで開く
              </a>
            </div>
          </div>

          {/* 中古車在庫 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#1e3a5f]">
              🚗 中古車在庫を見る
            </h2>
            <p className="mb-6 text-center text-gray-600">
              カーセンサーに掲載中の在庫はこちら
              <br />
              <span className="text-sm">
                ※未掲載の在庫もございます。お電話でお問い合わせください
              </span>
            </p>
            <a
              href={COMPANY.carsensorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto block max-w-md rounded-xl bg-red-500 py-4 text-center text-xl font-bold text-white transition hover:bg-red-600"
            >
              カーセンサーで在庫を見る →
            </a>
          </div>

          {/* 戻るリンク */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-[#1e3a5f] underline hover:text-[#c78c1e]"
            >
              ← トップページへ戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
