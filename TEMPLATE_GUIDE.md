# 🚀 Next.js 静的サイト構築テンプレート

## このドキュメントについて
アスカオートステーションのサイト構築で培ったノウハウを網羅的にまとめたもの。
新しいサイトを作る際のベース命令として使用できる。

---

## 📋 プロジェクト概要命令（コピペ用）

```
【プロジェクト作成指示】

■ 技術スタック
- Turborepo + pnpm（モノレポ）
- Next.js 15+（App Router、Static Export）
- React 19+
- TypeScript（strict mode）
- Tailwind CSS 4+（CSS-first configuration）

■ 目標
- 運用コストゼロ（Vercel無料枠、静的サイト）
- SEO完全対応
- PWA対応（アプリインストール可能）
- Google Analytics + Search Console連携

■ 会社情報
- 会社名: [会社名]
- 電話番号: [電話番号]
- 住所: [住所]
- 営業時間: [営業時間]
- 定休日: [定休日]
- Google評価: [★X.X（Y件）]
- 実績年数: [X年]
- Instagram: [URL]
- その他SNS: [URL]

■ ブランドカラー
- メインカラー: [#XXXXXX]（例: ネイビー #1e3a5f）
- アクセントカラー: [#XXXXXX]（例: ゴールド #e8a83e）

■ サイト哲学
[例: 信頼で勝負、価格では競争しない。電話ファースト。]

■ 必要ページ
- トップページ
- [サービス別ページ]
- お問い合わせ
- [その他]
```

---

## 🏗️ プロジェクト構造

```
project-root/
├── apps/
│   └── web/                    # Next.jsアプリ
│       ├── app/
│       │   ├── components/     # 共通コンポーネント
│       │   │   ├── AnimateOnScroll.tsx  # スクロールアニメーション
│       │   │   ├── GoogleAnalytics.tsx  # GA4
│       │   │   └── JsonLd.tsx           # 構造化データ
│       │   ├── globals.css     # Tailwind + カスタムCSS
│       │   ├── layout.tsx      # ルートレイアウト
│       │   ├── page.tsx        # トップページ
│       │   ├── robots.txt/     # SEO
│       │   ├── sitemap.xml/    # SEO
│       │   └── [機能別ページ]/
│       └── public/
│           ├── images/         # 画像
│           └── manifest.json   # PWA
├── packages/
│   ├── core/                   # 共有ロジック
│   ├── types/                  # 型定義
│   ├── eslint-config/          # ESLint設定
│   └── typescript-config/      # TypeScript設定
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🎨 デザイン原則

### 1. 余白（ホワイトスペース）
```css
/* セクション間の余白 */
section { @apply py-20 md:py-28; }

/* 見出し下の余白 */
h2 { @apply mb-16; }

/* カード内の余白 */
.card { @apply p-8; }
```

### 2. ブランドカラー設定（globals.css）
```css
@import "tailwindcss";

@theme {
  /* ブランドカラー */
  --color-primary: #1e3a5f;
  --color-primary-dark: #152a45;
  --color-accent: #e8a83e;
  --color-accent-light: #f0b84e;
  
  /* フォント */
  --font-family-sans: "Noto Sans JP", sans-serif;
}
```

### 3. ホバーアニメーション
```tsx
// カードのホバー効果
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

// ボタンのホバー効果
className="transition hover:bg-primary-dark"
```

### 4. スクロールアニメーション
```tsx
// components/AnimateOnScroll.tsx
"use client";
import { useEffect, useRef } from "react";

export function AnimateOnScroll({ 
  children, 
  delay 
}: { 
  children: React.ReactNode; 
  delay?: 100 | 200 | 300;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`animate-on-scroll ${delay ? `delay-${delay}` : ""}`}
    >
      {children}
    </div>
  );
}
```

---

## 🔍 SEO完全対応

### 1. メタデータ（layout.tsx）
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  manifest: "/manifest.json",
  title: {
    default: "会社名 | キャッチコピー",
    template: "%s | 会社名",
  },
  description: "説明文（120文字以内）",
  keywords: ["キーワード1", "キーワード2"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://example.com",
    siteName: "会社名",
    images: [{ url: "/images/ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "VERIFICATION_CODE",
  },
};
```

### 2. JSON-LD構造化データ
```tsx
// components/JsonLd.tsx
export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "会社名",
    image: "https://example.com/images/logo.png",
    telephone: "000-0000-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "住所",
      addressLocality: "市区町村",
      addressRegion: "都道府県",
      postalCode: "000-0000",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.0000,
      longitude: 139.0000,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", ...],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.instagram.com/xxx/",
      "https://maps.app.goo.gl/xxx",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
```

### 3. サイトマップ自動生成
```tsx
// app/sitemap.xml/route.ts
export async function GET() {
  const baseUrl = "https://example.com";
  const pages = ["/", "/about", "/contact"];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
```

### 4. robots.txt
```tsx
// app/robots.txt/route.ts
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

---

## 📊 アナリティクス設定

### Google Analytics（GA4）
```tsx
// components/GoogleAnalytics.tsx
"use client";
import Script from "next/script";

const GA_ID = "G-XXXXXXXXXX";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

### Vercel Analytics
```tsx
// layout.tsx
import { Analytics } from "@vercel/analytics/next";

// body内に追加
<Analytics />
```

---

## 📱 PWA対応

### manifest.json
```json
{
  "name": "会社名",
  "short_name": "略称",
  "description": "説明",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e3a5f",
  "icons": [
    {
      "src": "/images/logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/logo.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## 🚀 デプロイ手順

### 1. GitHub連携
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2. Vercel設定
- Project Name: `project-name`
- Framework: `Next.js`
- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm build`
- Output Directory: `.next`

### 3. デプロイ後の設定
1. **Google Search Console**
   - プロパティ追加 → URLプレフィックス
   - HTMLタグで認証 → `verification.google` に追加
   - サイトマップ送信: `sitemap.xml`

2. **Googleビジネスプロフィール**
   - ウェブサイトURLを追加

3. **Instagram**
   - プロフィールにURL追加

---

## 📝 ページ構成パターン

### トップページ構成
```tsx
export default function Home() {
  return (
    <>
      <HeroSection />        {/* ファーストビュー + CTA */}
      <TrustBadgesSection /> {/* 信頼の証（Google評価等） */}
      <StorySection />       {/* 歴史・ストーリー */}
      <ServicesSection />    {/* サービス一覧 */}
      <FAQSection />         {/* よくある質問 */}
      <AccessSection />      {/* アクセス・地図 */}
      <FinalCTASection />    {/* 最終CTA */}
    </>
  );
}
```

### 定数管理
```tsx
const COMPANY = {
  name: "会社名",
  phone: "000-0000-0000",
  phoneTel: "tel:0000000000",
  address: "住所",
  hours: "9:00〜18:00",
  googleMapUrl: "https://maps.app.goo.gl/xxx",
};
```

---

## ✅ チェックリスト

### 開発時
- [ ] TypeScript strict mode
- [ ] ESLint + Prettier設定
- [ ] Tailwind CSS設定
- [ ] 会社情報を定数化
- [ ] コンポーネント分割

### SEO
- [ ] メタデータ設定
- [ ] JSON-LD構造化データ
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] OGP画像

### デプロイ後
- [ ] Google Search Console認証
- [ ] サイトマップ送信
- [ ] Google Analytics設定
- [ ] Googleビジネスプロフィール更新
- [ ] SNSプロフィール更新

### パフォーマンス
- [ ] 画像最適化（next/image）
- [ ] フォント最適化（preconnect）
- [ ] 静的エクスポート確認

---

## 🎯 哲学メモ

### 中小企業サイトの本質
1. **電話が最終ゴール** - フォームより電話番号を目立たせる
2. **信頼の借用** - Google評価、実績年数、掲載メディア
3. **価格は出さない** - 「言い値」の業界では価格表示しない
4. **ストーリーを語る** - 数字だけでなく、歴史・人柄を伝える
5. **余白は高級感** - 詰め込まない、呼吸できるデザイン

### リサーチで学んだこと
- **Apple**: 1メッセージ1画面、極限のシンプルさ
- **Mercedes-Benz**: 余白の贅沢さ、感情的なコピー
- **Basecamp**: 創業者の顔と言葉、21年の実績を語る
- **Linear**: 洗練されたマイクロアニメーション

---

## 📦 依存パッケージ

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@vercel/analytics": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9.0.0"
  }
}
```

---

## 🔗 参考リンク

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Turborepo](https://turbo.build/repo)
- [Vercel](https://vercel.com/docs)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
