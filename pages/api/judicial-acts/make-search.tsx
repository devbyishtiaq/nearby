import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Only POST requests are allowed" });
        return;
    }

    try {
        const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        let apiUrl = `${process.env.BASE_URL}/v1/legislation/judicial-acts/case-search/`;
        const controller = new AbortController();
        const timeout = 60000;

        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const formdata = new FormData();
        formdata.append("query_text", userInput.queryText);
        formdata.append("start", userInput.currentStartPoint);

        if (userInput.activeCity){
            formdata.append("region", userInput.activeCity);
        }
        if (userInput.activeCaseCategory){
            formdata.append("case_category", userInput.activeCaseCategory);
        }
        if (userInput.activeCourt){
            formdata.append("court", userInput.activeCourt);
        }
        if (userInput.activeInstance){
            formdata.append("instance", userInput.activeInstance);
        }
        if (userInput.caseNumber){
            formdata.append("case_number", userInput.caseNumber);
        }
        if (userInput.caseDate){
            formdata.append("case_date", userInput.caseDate);
        }
        if (userInput.activeResult){
            formdata.append("case_result", userInput.activeResult);
        }
        if (userInput.plaintiff){
            formdata.append("case_plaintiff", userInput.plaintiff);
        }
        if (userInput.defendant){
            formdata.append("case_defendant", userInput.defendant);
        }
        if (userInput.activeHeader){
            formdata.append("sorting_option", userInput.activeHeader);
        }
        if (userInput.sortOrder){
            formdata.append("sorting_direction", userInput.sortOrder);
        }

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': `Token ${userInput.token}`,
            },
            redirect: "follow",
            signal: controller.signal
        };

        const response = await fetch(apiUrl, requestOptions);
        clearTimeout(timeoutId);
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseText = await response.text();

        // Attempt to parse response JSON
        let responseJson;
        try {
            responseJson = JSON.parse(responseText);
        } catch (error) {
            throw new Error("Invalid JSON format in response");
        }

        // Check if responseJson matches the expected structure
        if (!responseJson || !responseJson.final_data) {
            throw new Error("Unexpected response format or missing final_data");
        }

        // Access `final_data` directly since it's already parsed as an object
        let finalData = responseJson["final_data"];

        console.log(finalData["final_data"])

        if (!finalData["soap:Envelope"]) {
            // Handle non-SOAP response, assuming JSON format
            const numFound = finalData.numFound;
            const docs = finalData.docs;

            res.status(200).json({ numFound, docs });
            return;
        }

        const envelope = finalData["soap:Envelope"];
        if (!envelope) {
            throw new Error("Missing soap:Envelope in response");
        }

        const body = envelope["soap:Body"];
        if (!body) {
            throw new Error("Missing soap:Body in response");
        }

        const sendMessageResponse = body["tns:SendMessageResponse"];
        if (!sendMessageResponse) {
            throw new Error("Missing tns:SendMessageResponse in response");
        }

        const responseContent = sendMessageResponse["response"];
        if (!responseContent) {
            throw new Error("Missing response content in tns:SendMessageResponse");
        }

        const numFound = responseContent["numFound"];
        const docs = responseContent["docs"];
        console.log(responseContent);
        res.status(200).json({ numFound, docs });

    } catch (error: any) {
        if (error.name === 'AbortError') {
            res.status(408).json({ message: 'Request timed out' });
        } else {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}
