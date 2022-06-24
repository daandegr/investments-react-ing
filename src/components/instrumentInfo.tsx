import React from 'react';
import { Instrument } from '../types';

function InstrumentInfo({ instrument }: { instrument: Instrument }) {

    return (
        <div className='instrument-info'>
            <h3>{instrument.name} ({instrument.symbol})</h3>
            <div className='margin-left'>
                <div>Uid: {instrument.uid}</div>
                <div>Fund code: {instrument.fundCode}</div>
                <div>Price mutation: <span className={`trend-${instrument.trend}`}>{instrument.priceMutation}</span></div>
                <div>Exchange: {instrument.exchange}</div>
                <div>Category: {instrument.category}</div>
                <div>time: {(new Date(instrument.time)).toLocaleString()}</div>
                <div>Currency: {instrument.currency}</div>
            </div>
            <h3>Prices</h3>
            <div className='margin-left'>
                <div>Current: <b>{instrument.currentPrice.value}</b> {instrument.currency}</div>
                <div>Open: <b>{instrument.openPrice.value}</b> {instrument.currency}</div>
                <div>Close: <b>{instrument.closePrice.value}</b> {instrument.currency}</div>
                <div>High: <b>{instrument.highPrice.value}</b> {instrument.currency}</div>
                <div>Low: <b>{instrument.lowPrice.value}</b> {instrument.currency}</div>
            </div>
        </div>
    );
}

export default InstrumentInfo;
