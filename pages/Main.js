import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';

import json from '../resource/flightList';

export default function Main() {
  const [condition, setCondition] = useState({
    departure: 'ICN',
  });
  const [flightList, setFlightList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = ({ departure, destination }) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
    ) {

      // TODO:
      setCondition({ departure, destination });
    }
  };

  const handleFlight = async () => {
    setIsLoading(true); // 받아오는 데이터의 지연 시간 고려

    try { // 비행 데이터 가져오기
      const flightData = await getFlight(condition);
      setFlightList(flightData);
    } catch (err) {
      console.error(err);
    }

    // await new Promise((resolve) => setTimeout(resolve, 3000)); 로딩 시간 확보

    setIsLoading(false);
  };

  useEffect(() => {
    handleFlight();
  }, [condition]) // condition의 상태가 바뀔때마다 handleFlight 마운트 시킴

  global.search = search; // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  return (
    <div>
      <Head>
        <title>Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, Airline</h1>
        <Search onSearch={search} />
        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>

          {isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
        </div>
        {/* 기다리면 로딩 그림 랜더링해주고 아니면 비행 데이터 랜더링 해줌 */}

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
      </main>
    </div>
  );
}
