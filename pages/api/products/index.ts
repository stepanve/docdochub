import { NextApiRequest, NextApiResponse } from "next";
import scrapeIt from "scrape-it";

type Data = {
  title: string;
  asin1?: string;
  asin2?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO バリデーションチェック
    const { url } = req.body;

    const { data } = await scrapeIt<Data>(url, {
      title: "h1 #productTitle",
      asin1: {
        selector: "input[name='ASIN.0']",
        attr: "value",
      },
      asin2: {
        selector: "input[name='ASIN']",
        attr: "value",
      },
    });

    const ret = {
      title: data.title,
      asin: data.asin1 || data.asin2,
    };

    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
