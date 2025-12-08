// SEO構造化データ（JSON-LD）
// Google検索結果でのリッチスニペット表示を最適化
import "server-only";

const SITE_URL = "https://aska-auto-station-web.vercel.app";
const COMPANY = {
  name: "アスカオートステーション",
  // NAPの一貫性: 国際形式で統一
  phone: "+81-80-3250-6741",
  phoneLocal: "080-3250-6741",
  address: {
    streetAddress: "上野田678-1",
    addressLocality: "さいたま市緑区",
    addressRegion: "埼玉県",
    postalCode: "336-0977",
    addressCountry: "JP",
  },
  geo: {
    latitude: 35.91137022089156,
    longitude: 139.6940182981449,
  },
};

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // ===== WebSite（サイト全体の情報）=====
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        description: "さいたま市緑区で25年。車検・整備・修理・板金・中古車販売。",
        publisher: {
          "@id": `${SITE_URL}/#business`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/inspection?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "ja",
      },

      // ===== LocalBusiness（店舗情報）=====
      {
        "@type": ["LocalBusiness", "AutoRepair", "AutoDealer"],
        "@id": `${SITE_URL}/#business`,
        name: COMPANY.name,
        image: `${SITE_URL}/images/logo.png`,
        url: SITE_URL,
        telephone: COMPANY.phone,
        address: {
          "@type": "PostalAddress",
          ...COMPANY.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...COMPANY.geo,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "6",
        },
        priceRange: "$$",
        currenciesAccepted: "JPY",
        paymentAccepted: "Cash, Credit Card",
        // SEO: 「〇〇市 車検」で検索されるエリアを網羅
        areaServed: [
          // さいたま市の各区
          { "@type": "City", name: "さいたま市" },
          { "@type": "AdministrativeArea", name: "さいたま市緑区" },
          { "@type": "AdministrativeArea", name: "さいたま市浦和区" },
          { "@type": "AdministrativeArea", name: "さいたま市南区" },
          { "@type": "AdministrativeArea", name: "さいたま市岩槻区" },
          { "@type": "AdministrativeArea", name: "さいたま市見沼区" },
          // 近隣市
          { "@type": "City", name: "川口市" },
          { "@type": "City", name: "越谷市" },
          { "@type": "City", name: "草加市" },
          { "@type": "City", name: "八潮市" },
          { "@type": "City", name: "三郷市" },
          { "@type": "City", name: "春日部市" },
          { "@type": "City", name: "蕨市" },
          { "@type": "City", name: "戸田市" },
          // 最寄り駅エリア
          { "@type": "Place", name: "東川口駅周辺" },
          { "@type": "Place", name: "浦和美園駅周辺" },
        ],
        slogan: "車のこと、なんでもご相談ください",
        foundingDate: "2000",
        knowsAbout: [
          "車検",
          "自動車整備",
          "板金塗装",
          "中古車販売",
          "オークション代行",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "サービス一覧",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "車検",
                description: "法定24ヶ月点検・車検代行",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "整備・修理",
                description: "エンジン・ブレーキ・電装系など",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "板金塗装",
                description: "キズ・へこみ修理、塗装",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "中古車販売",
                description: "良質な中古車を格安で",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "買取",
                description: "お車の高価買取",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "オークション代行",
                description: "ご希望のお車をオークションで探します",
              },
            },
          ],
        },
        // sameAs: 公式SNS・外部プロファイル（Googleがビジネス正当性を判断）
        sameAs: [
          "https://www.instagram.com/askaautostation/",
          "https://www.carsensor.net/shop/saitama/313920001/",
          "https://maps.app.goo.gl/eNapSkTPYUf55xjq9",
        ],
      },

      // ===== FAQPage（よくある質問）=====
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "車検費用はいくらですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "車検費用は車種により異なります。当サイトの車検費用シミュレーションで、重量税・自賠責保険・印紙代の法定費用を事前にご確認いただけます。整備費用はお車の状態により異なりますので、お気軽にお電話でお問い合わせください。",
            },
          },
          {
            "@type": "Question",
            name: "予約は必要ですか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "事前にお電話（080-3250-6741）でご連絡いただけるとスムーズです。当日でもお車の状態によっては対応可能ですので、まずはお電話ください。",
            },
          },
          {
            "@type": "Question",
            name: "代車はありますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "代車のご用意がございます。ご予約時にお申し付けください。",
            },
          },
          {
            "@type": "Question",
            name: "支払い方法は？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "現金またはクレジットカードでお支払いいただけます。",
            },
          },
          {
            "@type": "Question",
            name: "営業時間を教えてください",
            acceptedAnswer: {
              "@type": "Answer",
              text: "9:00〜18:00で営業しております。お電話は080-3250-6741（社長直通）までお願いします。",
            },
          },
        ],
      },

      // ===== BreadcrumbList（パンくずリスト）=====
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: SITE_URL,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// ===== ページ別の構造化データ =====

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface VehicleInspectionJsonLdProps {
  vehicleName: string;
  makerName: string;
  url: string;
  legalFee: number;
}

export function VehicleInspectionJsonLd({
  vehicleName,
  makerName,
  url,
  legalFee,
}: VehicleInspectionJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${makerName} ${vehicleName}の車検`,
    description: `${makerName} ${vehicleName}の車検費用シミュレーション。法定費用${legalFee.toLocaleString()}円〜。さいたま市緑区のアスカオートステーション。`,
    provider: {
      "@type": "AutoRepair",
      name: "アスカオートステーション",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "さいたま市",
    },
    url: url,
    offers: {
      "@type": "Offer",
      price: legalFee,
      priceCurrency: "JPY",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
