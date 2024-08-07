import { Currency } from "@/definitions/types";
import { currencies } from "./constants";
import { parseStringPromise } from "xml2js";

export async function fetchBNBExchangeRates(): Promise<void> {
  const response = await fetch(
    "https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/index.htm?download=xml"
  );
  const xmlData = await response.text();
  const parsedData = await parseStringPromise(xmlData);

  const rates = parsedData.ROWSET.ROW.slice(1);
  rates.forEach((rate: any) => {
    const currency = rate.CODE[0] as Currency;

    if (currency === "USD" || currency === "EUR") {
      const rateValue = parseFloat(rate.RATE[0]);
      currencies[currency] = rateValue.toString();
    }
  });
}
