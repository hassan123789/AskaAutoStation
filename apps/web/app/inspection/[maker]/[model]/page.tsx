import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VEHICLES, MAKERS, getVehicle } from "@aska/core/vehicles";
import { calculateInspectionCost } from "@aska/core/tax";
import {
  BreadcrumbJsonLd,
  VehicleInspectionJsonLd,
} from "../../../components/JsonLd";

const SITE_URL = "https://aska-auto-station-web.vercel.app";

interface Props {
  params: Promise<{ maker: string; model: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { maker, model } = await params;
  const vehicle = getVehicle(model);

  if (!vehicle || vehicle.maker !== maker) {
    return {
      title: "車種が見つかりません | アスカオートステーション",
    };
  }

  const pageUrl = `${SITE_URL}/inspection/${maker}/${model}`;
  const title = `${vehicle.makerName} ${vehicle.modelName} 車検費用【${new Date().getFullYear()}年最新】`;
  const description = `${vehicle.makerName} ${vehicle.modelName}の車検費用シミュレーション。重量税・自賠責保険・印紙代の法定費用を即座に計算。さいたま市緑区で25年の実績、アスカオートステーション。080-3250-6741`;

  return {
    title,
    description,
    keywords: [
      `${vehicle.modelName} 車検`,
      `${vehicle.modelName} 車検費用`,
      `${vehicle.makerName} 車検`,
      "車検 さいたま市",
      "車検 緑区",
      "車検費用 シミュレーション",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "アスカオートステーション",
      locale: "ja_JP",
      images: [
        {
          url: "/images/logo.png",
          width: 512,
          height: 512,
          alt: `${vehicle.makerName} ${vehicle.modelName}の車検 | アスカオートステーション`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 静的生成用：全車種のパスを生成
export async function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({
    maker: vehicle.maker,
    model: vehicle.id,
  }));
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}

export default async function VehicleInspectionPage({ params }: Props) {
  const { maker, model } = await params;
  const vehicle = getVehicle(model);

  if (!vehicle || vehicle.maker !== maker) {
    notFound();
  }

  const makerInfo = MAKERS.find((m) => m.id === maker);
  const currentYear = new Date().getFullYear();

  // 複数のシナリオで計算
  const scenarios = [
    { year: currentYear - 3, label: "新車から3年目（初回車検）" },
    { year: currentYear - 5, label: "5年経過" },
    { year: currentYear - 10, label: "10年経過" },
    { year: currentYear - 14, label: "13年超" },
    { year: currentYear - 19, label: "18年超" },
  ];

  const costs = scenarios.map((scenario) => {
    const cost = calculateInspectionCost(vehicle, scenario.year);
    return {
      ...scenario,
      cost,
    };
  });

  // 代表的なコスト（5年経過）
  const typicalCost = costs[1]?.cost ?? costs[0]!.cost;
  const pageUrl = `${SITE_URL}/inspection/${maker}/${model}`;

  return (
    <>
      {/* SEO構造化データ */}
      <BreadcrumbJsonLd
        items={[
          { name: "ホーム", url: SITE_URL },
          { name: "車検費用", url: `${SITE_URL}/inspection` },
          { name: makerInfo?.name ?? "", url: `${SITE_URL}/inspection/${maker}` },
          { name: vehicle.modelName, url: pageUrl },
        ]}
      />
      <VehicleInspectionJsonLd
        vehicleName={vehicle.modelName}
        makerName={vehicle.makerName}
        url={pageUrl}
        legalFee={typicalCost.totalLegal}
      />

      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* パンくずリスト */}
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/inspection" className="hover:underline">
              車検費用
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/inspection/${maker}`} className="hover:underline">
              {makerInfo?.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">
              {vehicle.modelName}
            </span>
          </nav>

        {/* ヘッダー */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {vehicle.makerName} {vehicle.modelName}
            <span className="mt-2 block text-xl text-gray-600">車検費用シミュレーション</span>
          </h1>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>車両区分: {vehicle.category === "kei" ? "軽自動車" : "普通車"}</span>
            <span>重量: {vehicle.weight}kg</span>
            {vehicle.isHybrid && <span className="text-green-600">🌿 ハイブリッド</span>}
            {vehicle.isElectric && <span className="text-green-600">⚡ 電気自動車</span>}
          </div>
        </header>

        {/* 概算費用（メイン表示） */}
        <section className="mx-auto mb-12 max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-xl font-bold">車検費用の目安（5年経過車両）</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 法定費用（どこで車検を受けても同じ） */}
            <div className="space-y-4">
              <div className="flex justify-between border-b py-3">
                <span className="text-gray-600">重量税</span>
                <span className="font-semibold">¥{formatCurrency(typicalCost.weightTax)}</span>
              </div>
              <div className="flex justify-between border-b py-3">
                <span className="text-gray-600">自賠責保険（24ヶ月）</span>
                <span className="font-semibold">¥{formatCurrency(typicalCost.jibaiseki)}</span>
              </div>
              <div className="flex justify-between border-b py-3">
                <span className="text-gray-600">印紙代</span>
                <span className="font-semibold">¥{formatCurrency(typicalCost.stamp)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-[#1e3a5f] px-4 py-3 text-white">
                <span className="font-medium">法定費用 合計</span>
                <span className="text-lg font-bold">¥{formatCurrency(typicalCost.totalLegal)}</span>
              </div>
              <p className="text-xs text-gray-500">
                ※法定費用はどこで車検を受けても同じ金額です
              </p>
            </div>

            {/* 整備・点検料はお電話で */}
            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <h3 className="mb-3 font-bold text-gray-700">整備・点検料について</h3>
              <p className="mb-4 text-sm text-gray-600">
                整備料金はお車の状態により異なります。<br />
                お電話いただければ、丁寧にご説明いたします。
              </p>
              <a
                href="tel:08032506741"
                className="inline-block rounded-lg bg-gold px-6 py-3 font-bold text-navy transition hover:bg-gold-light"
              >
                📞 080-3250-6741
              </a>
              <p className="mt-2 text-xs text-gray-500">社長直通・お見積もり無料</p>
            </div>
          </div>
        </section>

        {/* 年式別シミュレーション */}
        <section className="mb-12">
          <h2 className="mb-6 text-center text-2xl font-bold">年式別 車検費用一覧</h2>
          <div className="overflow-x-auto">
            <table className="w-full overflow-hidden rounded-xl bg-white shadow-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">経過年数</th>
                  <th className="px-6 py-4 text-right">重量税</th>
                  <th className="px-6 py-4 text-right">自賠責</th>
                  <th className="px-6 py-4 text-right">印紙代</th>
                  <th className="px-6 py-4 text-right">法定費用 合計</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((item, index) => (
                  <tr key={item.year} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-medium">{item.label}</td>
                    <td className="px-6 py-4 text-right">¥{formatCurrency(item.cost.weightTax)}</td>
                    <td className="px-6 py-4 text-right">¥{formatCurrency(item.cost.jibaiseki)}</td>
                    <td className="px-6 py-4 text-right">¥{formatCurrency(item.cost.stamp)}</td>
                    <td className="px-6 py-4 text-right font-bold text-[#1e3a5f]">
                      ¥{formatCurrency(item.cost.totalLegal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            ※13年超・18年超の車両は重量税が重課されます
          </p>
        </section>

        {/* 注意事項 */}
        <section className="mx-auto mb-12 max-w-3xl rounded-xl bg-yellow-50 p-6">
          <h3 className="mb-4 text-lg font-bold">⚠️ ご注意ください</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 上記は概算費用です。実際の費用は車の状態により変動します。</li>
            <li>• 整備が必要な場合、部品代・工賃が別途かかります。</li>
            <li>• エコカー減税対象車は重量税が減免される場合があります。</li>
            <li>• 正確なお見積もりは無料で承ります。お気軽にご相談ください。</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-6 text-gray-600">
            {vehicle.makerName} {vehicle.modelName}の車検、お見積もりは無料です
          </p>
          <a
            href="tel:08032506741"
            className="bg-primary hover:bg-primary-dark inline-block rounded-lg px-8 py-4 text-lg font-bold text-white transition"
          >
            📞 080-3250-6741
            <span className="block text-sm font-normal">社長直通</span>
          </a>
        </section>

        {/* 他の車種へのリンク */}
        {makerInfo && (
          <section className="mt-16">
            <h2 className="mb-6 text-center text-xl font-bold">{makerInfo.name}の他の車種</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {VEHICLES.filter((v) => v.maker === maker && v.id !== model)
                .slice(0, 6)
                .map((v) => (
                  <Link
                    key={v.id}
                    href={`/inspection/${v.maker}/${v.id}`}
                    className="rounded-lg border bg-white px-4 py-2 transition hover:shadow-md"
                  >
                    {v.modelName}
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  );
}
