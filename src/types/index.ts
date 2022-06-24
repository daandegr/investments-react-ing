type Price = {
    value: number;
    unit: string | null;
    percent: boolean;
}

export type Trend = "up" | "down" | "equal";

export type Instrument = {
    name: string;
    category: string;
    exchange: string
    symbol: string;
    time: string;
    uid: string;
    currency: string;
    priceMutation: number;
    instrumentTypenumber: number;
    fundCode: number;

    closePrice: Price;
    currentPrice: Price;
    highPrice: Price;
    lowPrice: Price;
    openPrice: Price;

    trend?: Trend;
}

export type InstrumentResponse = {
    indexInstrument: Instrument;
    instruments: Array<Instrument>;
}