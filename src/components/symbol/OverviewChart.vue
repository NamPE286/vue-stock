<script setup lang="ts">
import { AreaSeries, CandlestickSeries, createChart } from 'lightweight-charts';
import type { CandleData } from '@/lib/stock';
import type { IChartApi } from 'lightweight-charts';
import { onMounted, watch } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import Div from '../Div.vue';
import { ref } from 'vue';
import Skeleton from 'primevue/skeleton';

const props = defineProps<{
  data: CandleData[];
}>();

const map = new Map<number, CandleData>();
let chart: IChartApi | null = null;
let checked = false;
let tooltipData = ref<CandleData | null>(null);
let range = 12;

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
  if (props.data.length === 0) {
    return;
  }

  const lastTimestamp = new Date(props.data[props.data.length - 1].timestamp).getTime();
  const cutoff = lastTimestamp - range * 3600 * 1000;
  const filteredData = props.data.filter(
    candle => new Date(candle.timestamp).getTime() >= cutoff,
  );

  map.clear();

  if (chart !== null) {
    chart.remove();
  }

  for (const i of filteredData) {
    map.set(
      Math.floor(new Date(i.timestamp).getTime() / 1000) - new Date().getTimezoneOffset() * 60,
      i,
    );
  }

  const isProfit = filteredData[filteredData.length - 1].close > filteredData[0].close;
  // @ts-ignore
  chart = createChart(document.getElementById('chart'), {
    layout: {
      textColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black',
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
  });
  const areaData = filteredData.map((candle) => ({
    time:
      Math.floor(new Date(candle.timestamp).getTime() / 1000) - new Date().getTimezoneOffset() * 60,
    value: candle.close,
  }));

  const areaSeries = chart.addSeries(AreaSeries, {
    lineColor: isProfit ? '#00c951' : '#ca0a22',
    topColor: isProfit ? '#0b5d2c' : '#670e1a',
    bottomColor: isProfit ? 'rgba(0, 201, 81, 0.28)' : 'rgba(202, 10, 34, 0.28)',
  });

  const candlestickData = filteredData.map((candle) => ({
    time:
      Math.floor(new Date(candle.timestamp).getTime() / 1000) - new Date().getTimezoneOffset() * 60,
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

  if (option.area) {
    // @ts-ignore
    areaSeries.setData(insertGap(areaData));
  }

  if (option.candlestick) {
    // @ts-ignore
    candlestickSeries.setData(insertGap(candlestickData));
  }

  chart.subscribeCrosshairMove((param) => {
    const elem = document.getElementById('chart-tooltips');

    if (!elem || !param.point) {
      if (elem) {
        elem.style.display = 'none';
      }
      return;
    }

    elem.style.left = `${param.point.x}px`;
    elem.style.top = `${param.point.y}px`;
    elem.style.transform = 'translate(-100px, 50px)';
    elem.style.display = 'block';

    const chartElem = document.getElementById('chart');
    if (chartElem) {
      const chartRect = chartElem.getBoundingClientRect();
      const tooltipRect = elem.getBoundingClientRect();
      let left: number = param.point.x;
      let top: number = param.point.y;

      if (left > chartRect.width - tooltipRect.width + 30) {
        left = chartRect.width - tooltipRect.width + 30;
      }

      elem.style.left = `${left}px`;
      elem.style.top = `${top}px`;
    }

    const data = param.seriesData.get(option.area ? areaSeries : candlestickSeries);

    if (map.has(Number(data?.time))) {
      tooltipData.value = map.get(Number(data?.time))!;
    }
  });

  chart.timeScale().applyOptions({
    timeVisible: true,
    secondsVisible: false,
  });

  chart.timeScale().fitContent();

  const logo = document.getElementById('tv-attr-logo');

  if (logo) {
    logo.remove();
  }
}

watch(
  () => props.data,
  () => {
    updateChart();
  },
);

window.addEventListener('resize', () => {
  if (chart) {
    chart.resize(document.getElementById('chart')?.clientWidth || 0, 350);
    chart.timeScale().fitContent();
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  updateChart({ area: !checked, candlestick: checked });
});

function changeMode() {
  updateChart({ area: !checked, candlestick: checked });
}

function formatDate(date: Date) {
  const minutes = date.getMinutes();
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${paddedMinutes}`;
}

onMounted(() => {
  updateChart({ area: true, candlestick: false });
});
</script>

<template>
  <Skeleton v-if="data.length == 0" class="w-full mb-[-350px]" height="375px"></Skeleton>
  <div id="chart" class="w-full h-[350px] relative">
    <Div id="chart-tooltips" class="text-xs/5 w-[200px] z-3 absolute hidden opacity-80">
      <div v-if="tooltipData != null">
        Date: <b class="float-right">{{ formatDate(new Date(tooltipData.timestamp)) }}</b
        ><br />
        Close: <b class="float-right">{{ Math.round(tooltipData.close * 100) / 100 }}</b
        ><br />
        Open: <b class="float-right">{{ Math.round(tooltipData.open * 100) / 100 }}</b
        ><br />
        High: <b class="float-right">{{ Math.round(tooltipData.high * 100) / 100 }}</b
        ><br />
        Low: <b class="float-right">{{ Math.round(tooltipData.low * 100) / 100 }}</b
        ><br />
        Volume: <b class="float-right">{{ tooltipData.volume }}</b>
      </div>
    </Div>
  </div>
  <div v-if="data.length != 0" class="flex gap-[10px] w-full justify-center">
    Area
    <ToggleSwitch v-model="checked" @change="changeMode" />
    Candlestick
  </div>
</template>

<style scoped></style>
