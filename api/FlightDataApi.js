import flightList from '../resource/flightList'
import fetch from 'node-fetch'

if (typeof window !== "undefined") {
  localStorage.setItem('flight', JSON.stringify(flightList));
}

export async function getFlight(filterBy = {}) {
  // HINT: 가장 마지막 테스트를 통과하기 위해, fetch를 이용합니다. 아래 구현은 완전히 삭제되어도 상관없습니다.
  // TODO: 아래 구현을 REST API 호출로 대체하세요.

  const result = await fetch('http://localhost:4999/flight').then((flight) => {
    return flight.json();
  });

  const filteredResult = result.filter((flight) => {
    if (filterBy.destination === flight.destination) {
      return flight;
    }
  });

  if (!filterBy.destination) {
    return result;
  } else {
    return filteredResult;
  }

}