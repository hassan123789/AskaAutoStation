/**
 * アスカオートステーション - 共有型定義
 * 車両、車検、税金計算に関する型定義
 */

// =====================================
// 車両関連
// =====================================

/** メーカー */
export type Maker =
  | "toyota"
  | "lexus"
  | "honda"
  | "nissan"
  | "mazda"
  | "subaru"
  | "suzuki"
  | "daihatsu"
  | "mitsubishi"
  | "bmw"
  | "mercedes"
  | "audi"
  | "volkswagen"
  | "mini"
  | "volvo"
  | "porsche"
  | "jeep"
  | "peugeot"
  | "renault";

/** 車両区分 */
export type VehicleCategory = "kei" | "standard" | "large";

/** 車両情報 */
export interface Vehicle {
  id: string;
  maker: Maker;
  makerName: string;
  model: string;
  modelName: string;
  category: VehicleCategory;
  weight: number; // kg
  displacement: number; // cc
  isEco: boolean;
  isHybrid: boolean;
  isElectric: boolean;
}

/** 車両マスターデータ */
export interface VehicleMaster {
  makers: MakerInfo[];
  vehicles: Vehicle[];
}

export interface MakerInfo {
  id: Maker;
  name: string;
  nameEn: string;
}

// =====================================
// 税金計算関連
// =====================================

/** 重量税計算パラメータ */
export interface WeightTaxParams {
  weight: number;
  isEco: boolean;
  registrationYear: number;
  category: VehicleCategory;
}

/** 重量税計算結果 */
export interface WeightTaxResult {
  amount: number;
  category: string;
  description: string;
  isReduced: boolean;
}

/** 自賠責保険料 */
export interface JibaisekiParams {
  category: VehicleCategory;
  months: 24 | 25 | 36 | 37;
}

/** 車検費用内訳 */
export interface InspectionCost {
  weightTax: number;
  jibaiseki: number;
  stamp: number; // 印紙代
  baseFee: number; // 基本料金
  totalLegal: number; // 法定費用合計
  totalWithFee: number; // 総額
}

/** 車検費用計算パラメータ */
export interface InspectionParams {
  vehicle: Vehicle;
  registrationYear: number;
  includeBaseFee?: boolean;
}

// =====================================
// 会社情報
// =====================================

export interface CompanyInfo {
  name: string;
  nameKana: string;
  postalCode: string;
  address: string;
  phone: string;
  businessHours: string;
  holidays: string;
  googleMapUrl: string;
  carsensorUrl: string;
}

// =====================================
// SEO関連
// =====================================

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// =====================================
// API レスポンス
// =====================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface InspectionApiResponse {
  vehicle: Vehicle;
  cost: InspectionCost;
  registrationYear: number;
  calculatedAt: string;
}
