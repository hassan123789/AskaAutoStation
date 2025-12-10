import Link from "next/link";
import { MAKERS, getVehiclesByMaker } from "@aska/core/vehicles";
import type { Maker } from "@aska/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = "https://aska-auto-station-web.vercel.app";

interface Props {
  params: Promise<{ maker: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { maker: makerId } = await params;
  const maker = MAKERS.find((m) => m.id === makerId);

  if (!maker) {
    return {
      title: "メーカーが見つかりません | アスカオートステーション",
    };
  }

  const vehicles = getVehiclesByMaker(makerId as Maker);
  const pageUrl = `${SITE_URL}/inspection/${makerId}`;

  return {
    title: `${maker.name}の車検費用【${vehicles.length}車種対応】`,
    description: `${maker.name}の車検費用シミュレーション。${vehicles.slice(0, 5).map((v) => v.modelName).join("・")}など${vehicles.length}車種の法定費用を即計算。さいたま市緑区のアスカオートステーション。`,
    keywords: [
      `${maker.name} 車検`,
      `${maker.name} 車検費用`,
      "車検 さいたま市",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${maker.name}の車検費用 | アスカオートステーション`,
      description: `${maker.name}${vehicles.length}車種の車検費用シミュレーション`,
      url: pageUrl,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return MAKERS.map((maker) => ({
    maker: maker.id,
  }));
}

export default async function MakerPage({ params }: Props) {
  const { maker: makerId } = await params;
  const maker = MAKERS.find((m) => m.id === makerId);

  if (!maker) {
    notFound();
  }

  const vehicles = getVehiclesByMaker(makerId as Maker);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* パンくずナビ */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            トップ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/inspection" className="hover:underline">
            車検費用
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1e3a5f]">{maker.name}</span>
        </nav>

        <h1 className="mb-4 text-center text-3xl font-bold">
          {maker.name}の車検費用
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          {maker.name}の車種を選んで、車検費用をシミュレーションできます。
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/inspection/${makerId}/${vehicle.id}`}
              className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm transition hover:border-[#c78c1e] hover:shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold text-[#1e3a5f]">
                  {vehicle.modelName}
                </h2>
                <p className="text-sm text-gray-500">
                  {vehicle.category === "kei" ? "軽自動車" : "普通車"}
                </p>
              </div>
              <span className="text-2xl text-gray-400">→</span>
            </Link>
          ))}
        </div>

        {/* 戻るリンク */}
        <div className="mt-12 text-center">
          <Link
            href="/inspection"
            className="text-[#1e3a5f] underline hover:text-[#c78c1e]"
          >
            ← メーカー一覧へ戻る
          </Link>
        </div>

        {/* 電話CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            ご不明な点はお気軽にお問い合わせください
          </p>
          <a
            href="tel:08032506741"
            className="cta-phone-pulse inline-block rounded-lg bg-[#c78c1e] px-8 py-4 text-lg font-bold text-[#1e3a5f] shadow-lg transition hover:bg-[#d9a43a]"
          >
            📞 080-3250-6741
            <span className="block text-sm font-normal">社長直通</span>
          </a>
        </div>
      </div>
    </div>
  );
}
