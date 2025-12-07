# アスカオートステーション 公式サイト

さいたま市緑区で25年の実績を持つ自動車整備・販売店の公式ウェブサイト。

## 🚗 サイト概要

- **車検費用シミュレーション**: 166車種対応、法定費用を即計算
- **静的サイト**: 運用コストゼロ、193ページを事前生成
- **SEO最適化**: JSON-LD構造化データ、sitemap、ローカルSEO対応

## 📁 プロジェクト構成

```
aska-auto/
├── apps/
│   └── web/                    # Next.js 16 静的サイト
│       ├── app/
│       │   ├── page.tsx        # トップページ
│       │   ├── inspection/     # 車検費用ページ（166車種）
│       │   ├── contact/        # お問い合わせ
│       │   └── components/     # JsonLd等
│       └── public/images/      # ロゴ画像
├── packages/
│   ├── core/                   # 車両データ・税金計算ロジック
│   ├── types/                  # TypeScript型定義
│   ├── eslint-config/          # ESLint設定
│   └── typescript-config/      # TypeScript設定
└── chat_history_export/        # 開発履歴（参照用）
```

## 🛠 技術スタック

- **フレームワーク**: Next.js 16 (App Router, Static Export)
- **スタイリング**: Tailwind CSS 4
- **ビルド**: Turborepo + pnpm
- **言語**: TypeScript 5.9 (Strict Mode)

## 📦 開発コマンド

```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev

# ビルド（193ページ生成）
pnpm build

# 本番サーバー起動
pnpm start
```

## 🎯 設計哲学

1. **信頼で勝負** - 価格競争しない、25年の実績とGoogle★5.0で訴求
2. **電話ファースト** - 社長直通、話せば人柄が伝わる
3. **運用コストゼロ** - 静的サイト、DB不要、API不要
4. **SEO資産** - 車種別ページで長期的な検索流入

## 📞 会社情報

- **会社名**: アスカオートステーション
- **住所**: 〒336-0977 埼玉県さいたま市緑区上野田678-1
- **電話**: 080-3250-6741（社長直通）
- **営業時間**: 9:00〜18:00

## 📄 ライセンス

Private - All Rights Reserved
