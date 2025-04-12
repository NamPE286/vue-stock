interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function formatDate(date: Date) {
  const [month, day, year] = date.toLocaleDateString('en-US').split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export async function getSymbolHistoricalCandles(symbol: string) {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${formatDate(yesterday)}/${formatDate(today)}?adjusted=true&sort=asc&limit=50000&apiKey=${import.meta.env.VITE_POLYGON_KEY}`);
  const data = await res.json();
  const result: Candle[] = [];

  for(const entry of data.results) {
    result.push({
      timestamp: new Date(entry.t),
      open: entry.o,
      high: entry.h,
      low: entry.l,
      close: entry.c,
      volume: entry.v,
    })
  }

  return result;
}

export function subscribeToCandleUpdates(symbol: string, callbackFn: (candle: Candle) => void) {
  // TODO
}
