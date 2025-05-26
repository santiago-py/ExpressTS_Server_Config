// Renamed APIResponse to Portfolio
export interface Portfolio {
  portfolioId: string;
  categories: AssetCategory[];
}

export interface AssetCategory {
  category: string;
  allocation: number;
  subCategories: SubAssetCategory[];
}

export interface SubAssetCategory {
  subCategory: string;
  allocation: number;
  securities: Security[];
}

export interface Security {
  ticker: string;
  name: string;
  allocation: number;
}

export interface PartnerResponse {
  [subCategory: string]: {
    category: string;
    securities: {
      [ticker: string]: {
        description: string;
        allocation: number;
      };
    };
  };
}

export const transform = (
  partnerData: PartnerResponse,
  portfolioId: string
): Portfolio => {
  const categoryMap = new Map<string, AssetCategory>();

  for (const [subCategory, { category, securities }] of Object.entries(
    partnerData
  )) {
    const securityEntries = Object.entries(securities).map(
      ([ticker, { description, allocation }]) => ({
        ticker,
        name: description,
        allocation,
      })
    );

    const subCategoryAllocation = securityEntries.reduce(
      (sum, sec) => sum + sec.allocation,
      0
    );

    const subCategoryEntry = {
      subCategory,
      allocation: subCategoryAllocation,
      securities: securityEntries,
    };

    if (!categoryMap.has(category)) {
      categoryMap.set(category, {
        category,
        allocation: 0,
        subCategories: [],
      });
    }

    const categoryEntry = categoryMap.get(category)!;
    categoryEntry.subCategories.push(subCategoryEntry);
    categoryEntry.allocation += subCategoryAllocation;
  }

  return {
    portfolioId,
    categories: Array.from(categoryMap.values()),
  };
};
