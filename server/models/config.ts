"use strict";

export interface configProps {
  dbName: string;
  dbHost: string;
  dbPort: number;
}

export const config: configProps = {
  dbName: "survapp",
  dbHost: "localhost",
  dbPort: 27017,
};
