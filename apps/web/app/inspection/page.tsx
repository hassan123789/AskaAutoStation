import Link from "next/link";
import { MAKERS, getVehiclesByMaker } from "@aska/core/vehicles";
import type { Metadata } from "next";

const SITE_URL = "https://aska-auto-station-web.vercel.app";

export const metadata: Metadata = {
  title: `車検費用シミュレーション【${new Date().getFullYear()}年最新】車種別で即計算`,
  description:
    "車種を選ぶだけで車検費用が即わかる！重量税・自賠責保険・印紙代の法定費用を自動計算。トヨタ・ホンダ・日産など166車種対応。さいたま市緑区のアスカオートステーション。",
  keywords: [
    "車検費用",
    "車検費用 シミュレーション",
    "車検 いくら",
    "重量税",
    "自賠責保険",
    "さいたま市 車検",
  ],
  alternates: {
    canonical: `${SITE_URL}/inspection`,
  },
  openGraph: {
    title: "車検費用シミュレーション | アスカオートステーション",
    description: "車種を選ぶだけで車検費用が即わかる！166車種対応。",
    url: `${SITE_URL}/inspection`,
    type: "website",
  },
};

export default function InspectionPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-center text-3xl font-bold">車検費用シミュレーション</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          お乗りのお車のメーカーと車種を選択すると、車検費用の概算をシミュレーションできます。
          実際の費用は車の状態により変動します。詳しくはお気軽にお問い合わせください。
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MAKERS.map((maker) => {
            const vehicles = getVehiclesByMaker(maker.id);
            return (
              <div
                key={maker.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="bg-primary px-6 py-4 text-white">
                  <h2 className="text-xl font-bold">{maker.name}</h2>
                </div>
                <ul className="space-y-3 p-6">
                  {vehicles.map((vehicle) => (
                    <li key={vehicle.id}>
                      <Link
                        href={`/inspection/${maker.id}/${vehicle.id}`}
                        className="flex items-center justify-between rounded-lg p-3 transition hover:bg-gray-50"
                      >
                        <span className="font-medium">{vehicle.modelName}</span>
                        <span className="text-gray-400">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-xl bg-blue-50 p-6">
          <h3 className="text-primary mb-4 text-lg font-bold">💡 車検費用について</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="w-24 font-semibold">重量税</dt>
              <dd className="flex-1 text-gray-600">
                車両重量に応じて決まる法定費用。エコカー減税対象車は割引があります。
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 font-semibold">自賠責保険</dt>
              <dd className="flex-1 text-gray-600">強制保険。24ヶ月分の保険料が必要です。</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 font-semibold">印紙代</dt>
              <dd className="flex-1 text-gray-600">検査手数料として国に納める費用です。</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-gray-600">
            ※整備・点検料金はお車の状態により異なります。お電話でお見積もりいたします。
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">ご不明な点やお見積もりのご依頼はお気軽にどうぞ</p>
          <a
            href="tel:08032506741"
            className="cta-phone-pulse bg-primary hover:bg-primary-dark inline-block rounded-lg px-8 py-4 text-lg font-bold text-white shadow-lg transition"
          >
            📞 080-3250-6741
            <span className="block text-sm font-normal">社長直通</span>
          </a>
        </div>
      </div>
    </div>
  );
}
