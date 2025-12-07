import Link from "next/link";
import { AnimateOnScroll } from "./components/AnimateOnScroll";

export const metadata = {
  title: "アスカオートステーション | さいたま市緑区で25年 車検・整備・中古車",
  description:
    "さいたま市緑区で25年。車検・整備・修理・板金・中古車販売。Google評価★5.0。まずはお電話ください。080-3250-6741（社長直通）",
};

// ===== 会社情報（定数） =====
const COMPANY = {
  name: "アスカオートステーション",
  phone: "080-3250-6741",
  phoneTel: "tel:08032506741",
  address: "〒336-0977 埼玉県さいたま市緑区上野田678-1",
  hours: "9:00〜18:00",
  years: 25,
  googleRating: 5.0,
  googleMapUrl: "https://maps.app.goo.gl/eNapSkTPYUf55xjq9",
  carsensorUrl: "https://www.carsensor.net/shop/saitama/313920001/",
  carsensorStockUrl: "https://www.carsensor.net/shop/saitama/313920001/stocklist/",
};

// ===== ヒーローセクション =====
// 哲学: 信頼訴求（25年・Google 5.0・カーセンサー掲載）、電話ファースト
function HeroSection() {
  return (
    <section className="bg-[#1e3a5f] py-20 text-white md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* 左側: メッセージ */}
          <div>
            <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm">
              ●さいたま市緑区で{COMPANY.years}年 | カーセンサー掲載店
            </div>
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              車のこと、
              <br />
              なんでもご相談ください
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              車検・整備・修理・板金・中古車販売・買取
            </p>
          </div>

          {/* 右側: 電話CTA（最重要） */}
          <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 text-center">
              <span className="text-[#e8a83e]">★★★★★</span>
              <span className="ml-2 text-sm">Google {COMPANY.googleRating}</span>
            </div>
            <a
              href={COMPANY.phoneTel}
              className="mb-4 block rounded-xl bg-[#e8a83e] py-6 text-center text-2xl font-bold text-[#1e3a5f] transition hover:bg-gold-light md:text-3xl"
            >
              📞 {COMPANY.phone}
            </a>
            <p className="text-center text-sm text-gray-300">
              社長直通 ・ {COMPANY.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== 信頼の証セクション =====
// 哲学: 第三者評価で信頼を借りる（Google・カーセンサー）
function TrustBadgesSection() {
  return (
    <section className="border-b bg-gray-50 py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-12">
        <a
          href={COMPANY.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 transition hover:text-[#1e3a5f]"
        >
          <span className="text-[#e8a83e]">★★★★★</span>
          <span className="font-semibold">Google {COMPANY.googleRating}</span>
          <span className="text-sm text-gray-500">→</span>
        </a>
        <a
          href={COMPANY.carsensorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 transition hover:text-[#1e3a5f]"
        >
          <span className="font-semibold">カーセンサー掲載店舗</span>
          <span className="text-sm text-gray-500">→</span>
        </a>
      </div>
    </section>
  );
}

// ===== ストーリーセクション =====
// 哲学: 人柄と歴史を伝える（Basecampに学ぶ）
function StorySection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-[#1e3a5f] md:text-4xl">
            さいたま市緑区で{COMPANY.years}年
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            2000年の創業以来、地域のお客様の「車のかかりつけ医」として
            <br className="hidden md:block" />
            一台一台、丁寧に向き合ってきました。
          </p>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            大手にはできない、顔の見える関係を大切にしています。
            <br className="hidden md:block" />
            困ったときに「あ、あそこに電話しよう」と思い出してもらえる。
            <br className="hidden md:block" />
            そんな存在でありたいと思っています。
          </p>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#e8a83e]">{COMPANY.years}</div>
              <div className="text-sm text-gray-600">年の実績</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#e8a83e]">★{COMPANY.googleRating}</div>
              <div className="text-sm text-gray-600">Google評価</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#e8a83e]">1</div>
              <div className="text-sm text-gray-600">人で対応（社長直通）</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== サービスセクション =====
// 哲学: 価格は出さない（言い値の業界）、電話 or カーセンサーへ誘導
function ServicesSection() {
  const services = [
    {
      icon: "🔧",
      title: "車検",
      description: "法定費用を事前に確認",
      link: "/inspection",
      linkText: "費用を確認 →",
    },
    {
      icon: "⚙️",
      title: "修理・整備",
      description: "お電話ください",
      link: COMPANY.phoneTel,
      linkText: "電話する",
      isPhone: true,
    },
    {
      icon: "🔨",
      title: "板金・塗装",
      description: "お電話ください",
      link: COMPANY.phoneTel,
      linkText: "電話する",
      isPhone: true,
    },
    {
      icon: "🚗",
      title: "中古車販売",
      description: "カーセンサーで在庫確認",
      link: COMPANY.carsensorStockUrl,
      linkText: "在庫を見る →",
      isExternal: true,
      highlight: true,
    },
    {
      icon: "🎯",
      title: "オークション代行",
      description: "お探しします",
      link: COMPANY.phoneTel,
      linkText: "電話する",
      isPhone: true,
    },
    {
      icon: "💰",
      title: "買取",
      description: "ご相談ください",
      link: COMPANY.phoneTel,
      linkText: "電話する",
      isPhone: true,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center text-sm font-semibold tracking-wider text-[#e8a83e]">
          SERVICE
        </div>
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">お任せください</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index < 3 ? ((index * 100) as 100 | 200 | 300) : undefined}>
              <div
                className={`h-full rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  service.highlight ? "border-red-200 bg-red-50" : "bg-white"
                }`}
              >
                <div className="mb-3 text-3xl">{service.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                {service.isPhone ? (
                  <a
                    href={service.link}
                    className="inline-block rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#152a45]"
                  >
                    📞 {service.linkText}
                  </a>
                ) : service.isExternal ? (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    {service.linkText}
                  </a>
                ) : (
                  <Link
                    href={service.link}
                    className="inline-block rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#152a45]"
                  >
                    {service.linkText}
                  </Link>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== 車検シミュレーターセクション =====
// 哲学: SEO価値（車種別ページ）、法定費用のみ表示（店による差がない部分）
function InspectionSection() {
  // 人気車種を表示（背景色がサービスセクションにあるので、ここは白）
  const popularVehicles = [
    { maker: "honda", model: "n-box", name: "N-BOX", type: "軽自動車" },
    { maker: "toyota", model: "prius", name: "プリウス", type: "普通車" },
    { maker: "toyota", model: "aqua", name: "アクア", type: "普通車" },
    { maker: "daihatsu", model: "tanto", name: "タント", type: "軽自動車" },
    { maker: "nissan", model: "note", name: "ノート", type: "普通車" },
    { maker: "nissan", model: "serena", name: "セレナ", type: "普通車" },
    { maker: "suzuki", model: "spacia", name: "スペーシア", type: "軽自動車" },
    { maker: "toyota", model: "harrier", name: "ハリアー", type: "普通車" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center text-sm font-semibold tracking-wider text-[#e8a83e]">
          SIMULATION
        </div>
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">車検費用を確認</h2>
        <p className="mb-16 text-center text-gray-600">
          車種を選ぶと法定費用（重量税・自賠責・印紙代）がわかります
        </p>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {popularVehicles.map((vehicle) => (
            <Link
              key={`${vehicle.maker}-${vehicle.model}`}
              href={`/inspection/${vehicle.maker}/${vehicle.model}`}
              className="rounded-xl border bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#1e3a5f] hover:shadow-lg"
            >
              <span className="mb-1 block text-xs text-gray-500">{vehicle.type}</span>
              <span className="text-lg font-bold">{vehicle.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/inspection"
            className="inline-block rounded-lg border-2 border-[#1e3a5f] px-6 py-3 font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white"
          >
            すべての車種を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ===== アクセスセクション =====
function AccessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center text-sm font-semibold tracking-wider text-[#e8a83e]">
          ACCESS
        </div>
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">アクセス</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Google Map埋め込み */}
          <div className="h-80 overflow-hidden rounded-xl bg-gray-200">
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

          {/* 店舗情報 */}
          <div className="rounded-xl border bg-white p-8">
            <h3 className="mb-6 text-xl font-bold">{COMPANY.name}</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-semibold text-gray-500">住所</dt>
                <dd className="text-lg">{COMPANY.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">営業時間</dt>
                <dd className="text-lg">{COMPANY.hours}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">定休日</dt>
                <dd className="text-lg">不定休（お電話でご確認ください）</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-500">アクセス</dt>
                <dd className="text-gray-700">
                  🚗 国道463号線「上野田」交差点すぐ
                  <br />
                  🚃 東川口駅より車で10分
                  <br />
                  🅿️ 駐車場あり
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <a
                href={COMPANY.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#152a45]"
              >
                📍 Googleマップで見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== よくある質問セクション =====
// 哲学: 電話ハードルを下げる。事前に不安を解消
function FAQSection() {
  const faqs: { question: string; answer: string }[] = [
    {
      question: "車検費用はいくらですか？",
      answer:
        "車種により異なります。当サイトの車検費用シミュレーションで法定費用を事前にご確認いただけます。整備費用はお車の状態によりますので、お気軽にお電話ください。",
    },
    {
      question: "予約は必要ですか？",
      answer:
        "事前にお電話いただけるとスムーズです。当日でもお車の状態によっては対応可能ですので、まずはお電話ください。",
    },
    {
      question: "代車はありますか？",
      answer: "代車のご用意がございます。ご予約時にお申し付けください。",
    },
    {
      question: "支払い方法は？",
      answer: "現金またはクレジットカードでお支払いいただけます。",
    },
    {
      question: "他店で購入した車でも大丈夫ですか？",
      answer:
        "もちろん大丈夫です。どこで購入されたお車でも、車検・整備・修理を承ります。お気軽にご相談ください。",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center text-sm font-semibold tracking-wider text-[#e8a83e]">
          FAQ
        </div>
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">よくある質問</h2>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-[#1e3a5f]">
                <span>Q. {faq.question}</span>
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>
              <div className="border-t px-6 py-4 text-gray-700">
                A. {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-600">
            その他ご不明な点はお気軽にお電話ください
          </p>
          <a
            href={COMPANY.phoneTel}
            className="inline-block rounded-lg bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#152a45]"
          >
            📞 {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== 最終CTAセクション =====
// 哲学: 電話が最終ゴール（話せば人柄がわかる）
function FinalCTASection() {
  return (
    <section className="bg-[#1e3a5f] py-20 text-white md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
          お気軽にお電話ください
        </h2>
        <p className="mb-8 text-gray-300">
          車のこと、なんでもご相談いただけます
        </p>
        <a
          href={COMPANY.phoneTel}
          className="inline-block rounded-xl bg-[#e8a83e] px-12 py-6 text-2xl font-bold text-[#1e3a5f] transition hover:bg-gold-light md:text-3xl"
        >
          📞 {COMPANY.phone}
        </a>
        <p className="mt-4 text-sm text-gray-400">社長直通</p>
      </div>
    </section>
  );
}

// ===== メインページ =====
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadgesSection />
      <StorySection />
      <ServicesSection />
      <InspectionSection />
      <FAQSection />
      <AccessSection />
      <FinalCTASection />
    </>
  );
}
