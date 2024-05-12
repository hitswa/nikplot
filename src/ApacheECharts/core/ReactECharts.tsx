import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
// import { EChartsInitOptions } from './echarts-types';
import { LiquidFillGaugeOption } from "./Utils";

export interface ReactEChartsProps {
    option: EChartsOption | LiquidFillGaugeOption | any
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
    className?: string;
}

interface EChartsInitOptions {
  devicePixelRatio?: number;
  renderer?: 'canvas' | 'svg';
  useDirtyRect: boolean;
  useCoarsePointer: boolean;
  pointerSize: Number;
  ssr: boolean;
  width?: number | string;
  height?: number | string;
  locale?: string;
  // Add other supported options here
}

// type EChartsEventListener<T = any> = (event: T) => void;

const ReactECharts = ({
    option,
    style,
    settings,
    loading,
    theme,
    className=''
  }: ReactEChartsProps) => {

    const chartRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        // Initialize chart
        let chart: ECharts | undefined;

        // setECharts(chart as ECharts);
        if (chartRef.current !== null) {
          const options: EChartsInitOptions = {
            devicePixelRatio: 1024,
            renderer: 'svg', // must use SVG rendering mode
            useDirtyRect: true,
            useCoarsePointer: true,
            pointerSize: 20,
            ssr: false, // enable SSR
            width: style?.height, 
            height: style?.width,
            locale: 'EN',
            // Add other options with their types
          };

          chart = init(chartRef.current, theme, options);

          // Add event listeners after chart creation (assuming library provides methods)
          if (chart) {
            // chart.on('mousewheel', (event: MouseEvent) => {
              chart.on('mousewheel', () => {
              passive: true; // Add passive option
              // Your existing mousewheel event handler code here
            });
            // chart.on('wheel', (event: MouseEvent) => {
              chart.on('wheel', () => {
              passive: true; // Add passive option
              // Your existing mousewheel event handler code here
            });
          }
        }
    
        // Add chart resize listener
        // ResizeObserver is leading to a bit janky UX
        function resizeChart() {
          chart?.resize();
        }
        window.addEventListener("resize", ()=>{
          setTimeout(()=>{
            resizeChart()
          },200)
        });
        window.addEventListener("orientationchange", ()=>{
          setTimeout(()=>{
            resizeChart()
          },200)
        });


        // window.addEventListener("click", (e:any)=>{
        window.addEventListener("click", ()=>{
          // console.log({chartRef},{chartCreateRef},{dimensions})
          if( chartRef.current ) {
            // console.log({w: chartRef.current.getBoundingClientRect()})
            setTimeout(()=>{
              resizeChart()
            },200)
          }
        });
    
        // Return cleanup function
        return () => {
          chart?.dispose();
          window.removeEventListener("resize", resizeChart);
          window.removeEventListener("orientationchange", resizeChart);
        };
    }, [theme]);
    
    useEffect(() => {
      // Update chart
      if (chartRef.current !== null) {
        const chart = getInstanceByDom(chartRef.current);
        if(chart) {
          if(option) {
            chart.setOption(option, settings);
          }
        }
      }
    }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function
  
    useEffect(() => {
      // Update chart
      if (chartRef.current !== null) {
        const chart = getInstanceByDom(chartRef.current);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if( chart )
          loading === true ? chart.showLoading() : chart.hideLoading();
      }
    }, [loading, theme]);


    return (
        <>
            <div ref={chartRef} style={{ height:"100%", width:"100%", ...style }} className={`${className}`} />
        </>
    )
}

export default ReactECharts