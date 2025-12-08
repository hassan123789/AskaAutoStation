import type { MetadataRoute } from "next";
import { MAKERS, VEHICLES } from "@aska/core";

const BASE_URL = "https://aska-auto-station-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/inspection`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // メーカー別ページ
  const makerPages: MetadataRoute.Sitemap = MAKERS.map((maker) => ({
    url: `${BASE_URL}/inspection/${maker.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 車種別ページ
  const vehiclePages: MetadataRoute.Sitemap = VEHICLES.map((vehicle) => ({
    url: `${BASE_URL}/inspection/${vehicle.maker}/${vehicle.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...makerPages, ...vehiclePages];
}
