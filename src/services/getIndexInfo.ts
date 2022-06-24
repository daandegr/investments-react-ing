import { Instrument, InstrumentResponse, Trend } from "../types";

// ing api does not have Access-Control-Allow-Origin header
const corsProxy = "http://0.0.0.0:8080/";

const getIndexInfo = async (indexName: string = 'AEX'): Promise<InstrumentResponse> => {
    let result = await(await fetch(`${corsProxy}https://www.ing.nl/api/securities/web/markets/stockmarkets/${indexName}`)).text();
    // unknown prefix? )]}',
    if(result.startsWith(")]}',")){
        result = result.substring(5);
    }
    return JSON.parse(result);
};

export default getIndexInfo;

export const getTrend = (prevInstrument:Instrument|null, nextInstrument:Instrument): Trend => {
    if(prevInstrument === null || prevInstrument.priceMutation === nextInstrument.priceMutation){
        return "equal";
    }
    if(prevInstrument.priceMutation <= nextInstrument.priceMutation){
        return "up";
    }
    return "down";
};