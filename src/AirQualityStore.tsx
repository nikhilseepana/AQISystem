import React, { createContext, ReactNode } from "react";
import { useLocalStore } from "mobx-react-lite";
import { toJS } from "mobx";

export const AirQualityContext =
  createContext<{
    aqi: {
      city: string;
      aqi: number;
    }[];
    trends: Record<string, number[]>;
    updateAqi(
      newAqi: {
        city: string;
        aqi: string;
      }[]
    ): void;
    getCityTrend(city: string): number[];
    init(): void;
  } | null>(null);

export const AirQualityProvider = ({ children }: { children: ReactNode }) => {
  const financial = (x: string) => {
    return parseFloat(Number.parseFloat(x).toFixed(2));
  };

  const store: {
    aqi: {
      city: string;
      aqi: number;
      ts: Date;
    }[];
    trends: Record<string, number[]>;
    updateAqi(
      newAqi: {
        city: string;
        aqi: string;
      }[]
    ): void;
    getCityTrend(city: string): number[];
    init(): void;
  } = useLocalStore(() => ({
    aqi: [],
    trends: {} as Record<string, number[]>,

    updateAqi(newAqi: { city: string; aqi: string }[]) {
      newAqi.map(({ city, aqi }) => {
        const idx = store.aqi.findIndex((x) => x.city === city);

        if (store.aqi[idx]) {
          store.aqi[idx] = { city, aqi: financial(aqi), ts: new Date() };
        } else {
          store.aqi.push({ city, aqi: financial(aqi), ts: new Date() });
        }

        if (store.trends.hasOwnProperty(city)) {
          store.trends[city].push(financial(aqi));
        } else {
          store.trends[city] = [financial(aqi)];
        }
        return null;
      });
    },

    getCityTrend(city: string) {
      return city && store.trends[city] && store.trends[city].length > 2
        ? toJS(store.trends[city].slice(-15))
        : [1, 1, 1];
    },

    init() {
      const ws = new WebSocket("wss://city-ws.herokuapp.com/");
      ws.onmessage = (evt) => {
        store.updateAqi(JSON.parse(evt.data));
      };
    },
  }));

  return (
    <AirQualityContext.Provider value={store}>
      {children}
    </AirQualityContext.Provider>
  );
};
