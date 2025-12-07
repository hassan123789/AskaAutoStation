/**
 * 自動車重量税・自賠責保険計算ロジック
 * 2024-2025年版対応
 */

import type {
  WeightTaxParams,
  WeightTaxResult,
  VehicleCategory,
  InspectionCost,
  Vehicle,
} from "@aska/types";

// =====================================
// 重量税計算（2024-2025年版）
// =====================================

/**
 * 軽自動車の重量税（2年分・自家用）
 */
const KEI_WEIGHT_TAX = {
  normal: 6600,
  over13: 8200,
  over18: 8800,
  eco: 0, // エコカー免税
  ecoReduced: 5000, // エコカー減税
} as const;

/**
 * 普通車の重量税（0.5トンあたり・2年分）
 */
const STANDARD_WEIGHT_TAX_PER_500KG = {
  normal: 4100,
  over13: 5700,
  over18: 6300,
  eco: 0, // エコカー免税
  ecoReduced: 2500, // エコカー減税（本則税率）
} as const;

/**
 * 重量税を計算する
 */
export function calculateWeightTax(params: WeightTaxParams): WeightTaxResult {
  const { weight, isEco, registrationYear, category } = params;
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - registrationYear;

  if (category === "kei") {
    return calculateKeiWeightTax(vehicleAge, isEco);
  }

  return calculateStandardWeightTax(weight, vehicleAge, isEco);
}

function calculateKeiWeightTax(age: number, isEco: boolean): WeightTaxResult {
  if (isEco) {
    return {
      amount: KEI_WEIGHT_TAX.eco,
      category: "軽自動車（エコカー免税）",
      description: "エコカー減税により免税",
      isReduced: true,
    };
  }

  if (age > 18) {
    return {
      amount: KEI_WEIGHT_TAX.over18,
      category: "軽自動車（18年超）",
      description: "初度登録から18年超のため重課",
      isReduced: false,
    };
  }

  if (age > 13) {
    return {
      amount: KEI_WEIGHT_TAX.over13,
      category: "軽自動車（13年超）",
      description: "初度登録から13年超のため重課",
      isReduced: false,
    };
  }

  return {
    amount: KEI_WEIGHT_TAX.normal,
    category: "軽自動車（通常）",
    description: "標準税率",
    isReduced: false,
  };
}

function calculateStandardWeightTax(weight: number, age: number, isEco: boolean): WeightTaxResult {
  // 0.5トン単位で切り上げ
  const weightUnit = Math.ceil(weight / 500);

  if (isEco) {
    const amount = weightUnit * STANDARD_WEIGHT_TAX_PER_500KG.ecoReduced;
    return {
      amount,
      category: `普通車 ${weightUnit * 0.5}t（エコカー減税）`,
      description: "エコカー減税（本則税率）適用",
      isReduced: true,
    };
  }

  if (age > 18) {
    const amount = weightUnit * STANDARD_WEIGHT_TAX_PER_500KG.over18;
    return {
      amount,
      category: `普通車 ${weightUnit * 0.5}t（18年超）`,
      description: "初度登録から18年超のため重課",
      isReduced: false,
    };
  }

  if (age > 13) {
    const amount = weightUnit * STANDARD_WEIGHT_TAX_PER_500KG.over13;
    return {
      amount,
      category: `普通車 ${weightUnit * 0.5}t（13年超）`,
      description: "初度登録から13年超のため重課",
      isReduced: false,
    };
  }

  const amount = weightUnit * STANDARD_WEIGHT_TAX_PER_500KG.normal;
  return {
    amount,
    category: `普通車 ${weightUnit * 0.5}t（通常）`,
    description: "標準税率",
    isReduced: false,
  };
}

// =====================================
// 自賠責保険料（2024年4月〜）
// =====================================

const JIBAISEKI_RATES = {
  kei: {
    24: 17540,
    25: 18040,
    36: 22600,
    37: 23100,
  },
  standard: {
    24: 17650,
    25: 18160,
    36: 23690,
    37: 24190,
  },
  large: {
    24: 20370,
    25: 20950,
    36: 28170,
    37: 28750,
  },
} as const;

/**
 * 自賠責保険料を取得
 */
export function getJibaisekiRate(
  category: VehicleCategory,
  months: 24 | 25 | 36 | 37 = 24
): number {
  return JIBAISEKI_RATES[category][months];
}

// =====================================
// 印紙代（検査手数料）
// =====================================

const STAMP_FEES = {
  kei: 1800, // 軽自動車
  standard: 1800, // 普通車（指定工場）
  large: 1800,
} as const;

export function getStampFee(category: VehicleCategory): number {
  return STAMP_FEES[category];
}

// =====================================
// 車検費用合計計算
// =====================================

/** アスカオートステーションの基本料金 */
const BASE_INSPECTION_FEE = {
  kei: 35000,
  standard: 40000,
  large: 50000,
} as const;

/**
 * 車検費用の合計を計算
 */
export function calculateInspectionCost(
  vehicle: Vehicle,
  registrationYear: number,
  includeBaseFee = true
): InspectionCost {
  const weightTaxResult = calculateWeightTax({
    weight: vehicle.weight,
    isEco: vehicle.isEco || vehicle.isHybrid || vehicle.isElectric,
    registrationYear,
    category: vehicle.category,
  });

  const weightTax = weightTaxResult.amount;
  const jibaiseki = getJibaisekiRate(vehicle.category, 24);
  const stamp = getStampFee(vehicle.category);
  const baseFee = includeBaseFee ? BASE_INSPECTION_FEE[vehicle.category] : 0;

  const totalLegal = weightTax + jibaiseki + stamp;
  const totalWithFee = totalLegal + baseFee;

  return {
    weightTax,
    jibaiseki,
    stamp,
    baseFee,
    totalLegal,
    totalWithFee,
  };
}

/**
 * 法定費用のみを計算（料金表示用）
 */
export function calculateLegalCostOnly(vehicle: Vehicle, registrationYear: number): InspectionCost {
  return calculateInspectionCost(vehicle, registrationYear, false);
}
