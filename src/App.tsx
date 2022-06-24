import React, { useEffect, useRef, useState } from 'react';
import InstrumentInfo from './components/instrumentInfo';
import getIndexInfo, { getTrend } from './services/getIndexInfo';
import { Instrument } from './types';
import './App.css';
import InstrumentRow from './components/instrumentRow';

const createInstrumentMapByUid = (instruments: Array<Instrument>) => {
  const instrumentsMap: Record<string, Instrument> = {};
  for (const instrument of instruments) {
    instrumentsMap[instrument.uid] = instrument;
  }
  return instrumentsMap;
};

function App() {
  const [pollIntervalTime, setPollIntervalTime] = useState(30000);
  const [indexInstrument, setIndexInstrument] = useState<Instrument | null>(null);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string | null>(null);
  const [instruments, setInstruments] = useState<Array<Instrument> | null>(null);
  const [error, setError] = useState<boolean>(false);
  
  const selectedInstrumentRef = useRef<HTMLInputElement | null>(null);
  const selectedInstrument = instruments !== null && selectedInstrumentId !== null ? createInstrumentMapByUid(instruments)[selectedInstrumentId] : null;

  const updatePollIntervalTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(event.currentTarget.value);
    setPollIntervalTime(input < 1000 ? 1000 : input);
  }

  const updateSelectedInstrument = (id: string) => {
    setSelectedInstrumentId(id);
    if(selectedInstrumentRef !== null && selectedInstrumentRef.current){
      selectedInstrumentRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    const updateInfo = async () => {
      try {
        const result = await getIndexInfo();
        setIndexInstrument(currentInstrument => {
          return { ...result.indexInstrument, trend: getTrend(currentInstrument, result.indexInstrument) }
        });

        setInstruments(currentInstrumentsState => {
          if (currentInstrumentsState !== null) {
            const instrumentsMap = createInstrumentMapByUid(currentInstrumentsState);
            return result.instruments.map(instrument => { return { ...instrument, trend: getTrend(instrumentsMap[instrument.uid], instrument) } });
          } else {
            return result.instruments.map(instrument => { return { ...instrument, trend: "equal" } });
          }
        });
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    updateInfo();
    const interval = setInterval(updateInfo, pollIntervalTime);
    return () => clearInterval(interval);
  }, [pollIntervalTime]);

  return (
    <div >
      {error && <>There has been an error</>}

      <div>Poll interval time in MS </div>
      <input value={pollIntervalTime} type="number" onChange={updatePollIntervalTime}></input>

      {indexInstrument && <>
        <h1>{indexInstrument.name}({indexInstrument.symbol})</h1>
        <div className='instrument-info-wrapper'>
          {<InstrumentInfo instrument={indexInstrument} />}
          <div ref={selectedInstrumentRef}>
            {selectedInstrument && <InstrumentInfo instrument={selectedInstrument}/>}
          </div>
        </div>

        <div className='instrument-list'>
          <h2>{indexInstrument.name}({indexInstrument.symbol}) Instruments</h2>
          {instruments && instruments.map(instrument => <InstrumentRow instrument={instrument} setSelectedInstrumentUid={updateSelectedInstrument} />)}
        </div>
      </>}

    </div>
  );
}

export default App;
