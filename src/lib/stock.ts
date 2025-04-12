export interface Candle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  volumeWeighted: number;
  transaction: number;
}

export interface Stock {
  timestamp: Date;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

const socket = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FH_KEY}`);

export async function getSymbolName(symbol: string): Promise<string> {
  const res = await fetch(`https://finnhub.io/api/v1/search?q=${symbol}&token=${import.meta.env.VITE_FH_KEY}`);
  const data = await res.json();

  return data.result[0].description;
}

export async function getSymbolHistoricalCandles(symbol: string): Promise<Candle[]> {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${yesterday.getTime()}/${today.getTime() - 1000}?adjusted=true&sort=asc&limit=50000&apiKey=${import.meta.env.VITE_POLYGON_KEY}`);
  const data = await res.json();
  const result: Candle[] = [];

  console.log(result);

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

export async function getSymbolPrice(symbol: string): Promise<Stock> {
  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FH_KEY}`);
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

export function subscribeToPriceUpdates(symbol: string, callbackFn: (stock: Stock) => void) {
  socket.addEventListener('open', function () {
    socket.send(JSON.stringify({ type: 'subscribe', symbol: symbol }));
  });

  socket.addEventListener('message', function (event) {
    console.log(event.data);
    const data = event.data;

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
