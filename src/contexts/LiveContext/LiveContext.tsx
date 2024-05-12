/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import io from 'socket.io-client';

interface ILiveContext {
  socket: any;
  isConnected: boolean;
  // sendMessage: (message:string, channel: string)=>void;
  setChartId: Dispatch<SetStateAction<string>>;
  getChartOptions: () => any;
  chartOptions: any;
  setSocketURL: Dispatch<SetStateAction<string>>;
}

export const LiveContext = React.createContext({} as ILiveContext);

interface IProp {
  children: ReactNode | ReactNode[];
}

const LiveProvider = (props: IProp) => {
  const [socketURL, setSocketURL] = useState<string>('http://127.0.0.1:3002');
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [chartId, setChartId] = useState<string>('');

  const [chartOptions, setChartOptions] = useState<any>(null);

  // console.log(`${socketURL}${chartId ? `/${chartId}` : ''}`);

  useEffect(() => {
    if (socket && socket?.connected) { return; }
    if( !chartId ) { return; }

    let tempSocket = io(`${socketURL}${chartId ? `/${chartId}` : ''}`);

    if (tempSocket) {
      setSocket(tempSocket);
    }
  }, [chartId]);

  useEffect(() => {
    if (socket) { return; }

    if( !chartId ) { return; }

    let tempSocket = io(`${socketURL}${chartId ? `/${chartId}` : ''}`);

    if (tempSocket) {
      setSocket(tempSocket);
    }
  }, [socketURL]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('connect', () => {
      // console.log('socket connected')
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      // console.log('socket disconnected')
      setIsConnected(false);
    });

    socket.on('reconnect', () => {
      // console.log('socket reconnected')
    });

    socket.on('message', (data: any) => {
      console.log('chartOption', { data });
      setChartOptions(data);
    });

    // return () => {
    //     socket.off('connect');
    //     socket.off('disconnect');
    //     socket.off('zeeq-notice-test');
    //     socket.off('zeeq-notice-endpoint-live');
    // };
  }, [socket]);

  // const sendMessage = (message:string, channel: string) => {
  //     if( !socket ) {
  //         return
  //     }
  //     socket.emit(message);
  // }

  const getChartOptions = () => {
    return chartOptions;
  };

  return (
    //   <LiveContext.Provider value={{socket, isConnected, zeeqNoticeTest, zeeqNoticeEndpointLive, zeeqNoticeGlobal, sendMessage}}>
    <LiveContext.Provider
      value={{ socket, isConnected, setChartId, setSocketURL, getChartOptions, chartOptions }}
    >
      {props.children}
    </LiveContext.Provider>
  );
};

export default LiveProvider;
