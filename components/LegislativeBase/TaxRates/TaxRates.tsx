import React, { useState, useEffect } from "react";
import CardWithGreenHeader from "../../AIKAGeneral/CardWithGreenHeader/CardWithGreenHeader";
import { apiTaxRates } from "../../../services/apiTaxRates";

interface TaxRatesProp {
    token: string;
    header: string;
}

const TaxRates: React.FC<TaxRatesProp> = ({ token, header }) => {
    const [taxRateData, setTaxRateData] = useState<{ name: string; value: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiTaxRates(token);
                const newTaxRateData = data.map((taxRate: { tax_name_en: string, tax_rate: string }) => ({
                    name: taxRate.tax_name_en,
                    value: taxRate.tax_rate
                }));
                setTaxRateData(newTaxRateData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <CardWithGreenHeader cardHeader={header} contentList={taxRateData} />
    );
}

export default TaxRates;
