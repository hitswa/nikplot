import React, { useEffect, useState, FC, CSSProperties, useContext } from "react";
import { ReactECharts } from "../../ApacheECharts";
import type { EChartOption } from "echarts";
import { LiveContext } from "../../contexts";

export interface ChartProps {
    chartId: string;
    style?: CSSProperties;
    loading?: boolean;
    theme?: "light" | "dark";
    className?: string;
    socketUrl?: string;
}

const Chart:FC<ChartProps> = (props) => {
    const [localChartId, setLocalChartId] = useState<string>('');
    const [options, setOptions] = useState<EChartOption>({});

    const liveContext = useContext(LiveContext)

    useEffect(()=>{
         if( props.chartId === null || props.chartId === undefined || props.chartId === '' ) {
            return;
         }
         setLocalChartId(props.chartId)
    },[props.chartId])

    useEffect(()=>{
        if( props.socketUrl === null || props.socketUrl === undefined || props.socketUrl === '' ) {
           return;
        }
        liveContext.setSocketURL(props.socketUrl)
   },[props.socketUrl])

    useEffect(()=>{
        liveContext.setChartId(props.chartId)
    },[localChartId])

    useEffect(()=>{
        let chartOptions = liveContext.getChartOptions();
        setOptions(chartOptions);
    },[liveContext.chartOptions])

    return (
        <ReactECharts
            option={options}
            style={props?.style}
            // settings={props?.style}
            loading={props?.loading}
            theme={props?.theme}
            className={props?.className}
        />
    )
}

export default Chart;