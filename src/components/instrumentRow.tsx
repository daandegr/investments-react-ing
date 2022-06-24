import React from 'react';
import { Instrument } from '../types';

function InstrumentRow({ instrument, setSelectedInstrumentUid }: { instrument: Instrument, setSelectedInstrumentUid: (id: string) => void }) {

    return (
        <div className='instrument-row' onClick={() => { setSelectedInstrumentUid(instrument.uid) }}>
            <div><b>{instrument.name}</b> ({instrument.symbol})</div>
            <div>Price mutation: <span className={`trend-${instrument.trend}`}>{instrument.priceMutation}</span></div>
        </div>
    );
}

export default InstrumentRow;
