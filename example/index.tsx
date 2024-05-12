import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { NikPlot } from '../.';

const App = () => {
  return (
    <div style={{ height: '500px', width: '700px', border: '2px solid #000' }}>
      <NikPlot chartId="lineChart" />
    </div>
  );
};

const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement!);
root.render(<App/>);
