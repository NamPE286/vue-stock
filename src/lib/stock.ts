export interface CandleData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  volumeWeighted: number;
  transaction: number;
}

export interface StockData {
  timestamp: Date;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface HeadlineData {
  category: string;
  time: Date;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

const socket = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FH_KEY}`);

export async function getSymbolName(symbol: string): Promise<string> {
  const res = await fetch(
    `https://finnhub.io/api/v1/search?q=${symbol}&token=${import.meta.env.VITE_FH_KEY}`,
  );
  const data = await res.json();

  return data.result[0].description;
}

export async function getSymbolHistoricalCandles(symbol: string): Promise<CandleData[]> {
  const end = new Date();
  end.setUTCHours(20, 0, 0, 0);

  const day = end.getUTCDay();
  if (day === 0) {
    end.setUTCDate(end.getUTCDate() - 2);
  } else if (day === 6) {
    end.setUTCDate(end.getUTCDate() - 1);
  }

  const start = new Date(end.getTime() - 23400000);

  const res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${start.getTime()}/${end.getTime()}?adjusted=true&sort=asc&limit=50000&apiKey=${import.meta.env.VITE_POLYGON_KEY}`,
  );
  const data = await res.json();
  const result: CandleData[] = [];

  for (const entry of data.results) {
    result.push({
      timestamp: new Date(entry.t),
      open: entry.o,
      high: entry.h,
      low: entry.l,
      close: entry.c,
      volume: entry.v,
      volumeWeighted: entry.vw,
      transaction: entry.n,
    });
  }
  return result;
}

export async function getSymbolPrice(symbol: string): Promise<StockData> {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FH_KEY}`,
  );
  const data = await res.json();

  return {
    price: data.c,
    change: data.d,
    percentChange: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc,
    timestamp: new Date(data.t * 1000),
  };
}

export function subscribeToPriceUpdates(symbol: string, callbackFn: (stock: StockData) => void) {
  socket.addEventListener('open', function () {
    socket.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
  });

  socket.addEventListener('message', function (event) {
    if (event.data == '{"type":"ping"}') {
      return;
    }

    const data = event.data.data;

    callbackFn({
      price: data.c,
      change: data.d,
      percentChange: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      timestamp: new Date(data.t * 1000),
    });
  });
}

export async function getSymbolNews(symbol: string) {
  const end = new Date();
  const start = new Date(end.getTime() - 7 * 86400000);
  const res = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${start.toISOString().split('T')[0]}&to=${end.toISOString().split('T')[0]}&token=${import.meta.env.VITE_FH_KEY}`,
  );
  const data = await res.json();
  const result: HeadlineData[] = [];

  for (const entry of data) {
    result.push({
      category: entry.category,
      time: new Date(entry.datetime * 1000),
      headline: entry.headline,
      id: entry.id,
      image: entry.image,
      related: entry.related,
      source: entry.source,
      summary: entry.summary,
      url: entry.url,
    });
  }
  
  return result;
}
