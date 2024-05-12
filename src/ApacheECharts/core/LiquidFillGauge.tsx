
import React from "react";
import "echarts-liquidfill";
import type { CSSProperties } from "react";
import ReactECharts from "./ReactECharts";
import type { LiquidFillGaugeOption } from "./Utils";

export interface LiquidFillGaugeProps {
  option: LiquidFillGaugeOption;
  style?: CSSProperties;
}

const LiquidFillGauge = ({ option, style }: LiquidFillGaugeProps): JSX.Element => {
  return (
    <ReactECharts
      option={option}
      style={style}
    />
  );
}

export default LiquidFillGauge;