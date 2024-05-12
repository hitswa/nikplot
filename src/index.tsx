import * as React from 'react';
import { LiveProvider } from './contexts';
import { Chart, ChartProps } from './Components';

export const NikPlot = (props: ChartProps) => {
  return (
    <LiveProvider>
      <Chart {...props} />
    </LiveProvider>
  )
}