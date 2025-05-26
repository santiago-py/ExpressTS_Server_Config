import { Router, Request, Response } from "express";
import { transform } from "../utils/transform";

const router = Router();

// Fake partner data source
const partnerData = {
  "US Small Cap Equity": {
    category: "Equity",
    securities: {
      IJR: {
        description: "iShares Core S&P Small-Cap ETF",
        allocation: 400,
      },
      IYW: {
        description: "iShares U.S. Technology ETF",
        allocation: 267,
      },
    },
  },
  Other: {
    category: "CASH",
    securities: {
      CASH: {
        description: "US Dollars",
        allocation: 400,
      },
    },
  },
  "US Mid Cap Equity": {
    category: "Equity",
    securities: {
      SPMD: {
        description: "SPDR® Portfolio S&P 400 Mid Cap ETF",
        allocation: 510,
      },
    },
  },
};

router.get("/:portfolioId/classification", (req: Request, res: Response) => {
  const { portfolioId } = req.params;
  const response = transform(partnerData, portfolioId);
  res.json(response);
});

export default router;
