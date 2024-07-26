import React, { useState, useEffect } from "react";
import CardWithGreenHeader from "../../AIKAGeneral/CardWithGreenHeader/CardWithGreenHeader";
import { apiBetsRates } from "../../../services/apiBetsRates";

interface BetsRatesProp {
    token: string;
    header: string
}

const BetsRates: React.FC<BetsRatesProp> = ({ token, header }) => {
    const [betsRatesData, setBetsRatesData] = useState<{ name: string; value: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiBetsRates(token);
                const newTaxRateData = data.map((taxRate: { bets_name_en: string, bets_rate: string }) => ({
                    name: taxRate.bets_name_en,
                    value: taxRate.bets_rate
                }));
                setBetsRatesData(newTaxRateData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <CardWithGreenHeader cardHeader={ header } contentList={betsRatesData} />
    );
}

export default BetsRates;
