<script setup lang="ts">
import { AreaSeries, CandlestickSeries, createChart } from 'lightweight-charts';
import type { Candle } from '@/lib/stock';
import type { IChartApi } from 'lightweight-charts';
import { onMounted, watch } from 'vue';

const props = defineProps<{
  data: Candle[];
}>();

let chart: IChartApi | null = null;

function insertGap(
  data: {
    time: number;
    value: number;
  }[],
) {
  const res: {
    time: number;
    value: number;
  }[] = [];

  for (const i of data) {
    if (res.length === 0) {
      res.push(i);
      continue;
    }

    while (i.time - res[res.length - 1].time > 60) {
      res.push({
        time: res[res.length - 1].time + 60,
        value: res[res.length - 1].value,
      });
    }

    res.push(i);
  }

  return res;
}

function updateChart(option = { area: true, candlestick: false }) {
  if (chart === null) {
    return;
  }

  if (option.area) {
    const areaData = props.data.map((candle) => ({
      time: Math.floor(new Date(candle.timestamp).getTime() / 1000) - new Date().getTimezoneOffset() * 60,
      value: candle.close,
    }));

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });
    // @ts-ignore
    areaSeries.setData(insertGap(areaData));
  }

  if (option.candlestick) {
    const candlestickData = props.data.map((candle) => ({
      time: Math.floor(new Date(candle.timestamp).getTime() / 1000),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    // @ts-ignore
    candlestickSeries.setData(candlestickData);
  }

  chart.timeScale().applyOptions({
    timeVisible: true,
    secondsVisible: false,
  });

  chart.timeScale().fitContent();
}

watch(
  () => props.data,
  () => {
    updateChart();
  },
);

window.addEventListener('resize', () => {
  if (chart) {
    chart.resize(document.getElementById('chart')?.clientWidth || 0, 400);
    chart.timeScale().fitContent();
  }
});

onMounted(() => {
  // @ts-ignore
  chart = createChart(document.getElementById('chart'), {
    layout: {
      textColor: 'white',
      background: {
        type: 'solid',
        color: 'transparent',
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
    handleScroll: false,
    handleScale: false,
  });

  updateChart();
});
</script>

<template>
  <h2>AAPL Chart (last trading day)</h2>
  <div id="chart" class="w-full h-[400px]"></div>
</template>

<style scoped>
h2 {
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 10px;
}
</style>
