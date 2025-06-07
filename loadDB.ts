import { DataAPIClient } from "@datastax/astra-db-ts"
import OpenAI from "openai";
import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { PuppeteerWebBaseLoader } from '@langchain/community/document_loaders/web/puppeteer';

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const { OPENAI_API_KEY, ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_KEYSPACE_NAME, ASTRA_DB_COLLECTION_NAME } = process.env;
 
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
})

const homeAutomationData = [
    'https://en.wikipedia.org/wiki/Home_automation',
    'https://www.security.org/home-automation/',
    'https://www.securetech.com.ng/guide-to-implementing-home-automation/',
    'https://www.ajol.info/index.php/jonamp/article/view/127909',
    'https://www.researchgate.net/publication/383183956_BLUETOOTH_CONTROL_HOME_AUTOMATION',
    'https://projecthub.arduino.cc/Shubhamkumar97/home-automation-using-arduino-and-bluetooth-control-2fd190',
    'https://iotdesignpro.com/articles/diy-voice-controlled-home-automation-with-arduino-and-bluetooth',
    'https://www.geeksforgeeks.org/iot-home-automation/',
    'https://www.iot-now.com/2024/07/30/145721-the-power-of-iot-home-automation/',
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT || 'HJ', { keyspace: ASTRA_DB_KEYSPACE_NAME });

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
});

const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
   const res =  await db.createCollection(ASTRA_DB_COLLECTION_NAME || 'HJ', {
        vector: {
            dimension: 1536,
            metric: similarityMetric
        }
   })
    console.log(res);
}

const scrapePage = async (url: string)=> {
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(()=> document.body.innerHTML);
            await browser.close()
            return result;
        }
    })

    return ( await loader.scrape())?.replace(/<[^>]*>?/gm, '')
}



const loadSampleData = async () => {
    const collecttion = await db.collection(ASTRA_DB_COLLECTION_NAME || 'hj')
        for await ( const url of homeAutomationData){
            const content = await scrapePage(url)
            const chunks = await splitter.splitText(content);
            for await ( const chunk of chunks){
                const embedding = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: chunk,
                    encoding_format: "float"
                })

                const vector = embedding.data[0].embedding;

                const res = await collecttion.insertOne({
                    $vector: vector,
                    text: chunk
                })

                console.log(res);
            }
        }
    
}

createCollection().then(()=> loadSampleData());
