export type CarType = {
  name: string,
  color: string,
  id: number | null,
};

export type DataParamsNewCar = {
  name: string,
  color: string,
};

export type DataNewWinner = {
  id: number,
  wins: number,
  time: number
};

export type CarStateType = {
  id: number,
  time: number,
  response: number
};

export type WinnerParams = {
  id: number,
  wins: number,
  time: number,
};

export type StartEngineData = {
  velocity: number,
  distance: number,
};

export type StartEngineResp = {
  data: { velocity: number, distance: number },
  status: number,
};

export type Setting = {
  parentClassName: string,
  idNameInput: string,
  idColorInput: string,
  idBtn: string,
  btnText: string,
};

export type ComponentType = {
  tag: string,
  className: string,
  id: string,
  content: string,
};

export type AnimState = {
  reqestId: number,
};

export type DriveTime = {
  driveTime: number;
};

export interface ToDo {
  [index: string]: () => void;
  'create-btn': () => void,
}

export type CarsState = {
  [index: string]: string,
};

export const rgbToHex = (str: string) => {
  const values = str.slice(4, -1).split(', ').map((e) => +e);
  return `#${values.map((e) => (e.toString(16).length === 1 ? `0${e.toString(16)}` : `${e.toString(16)}`)).join('')}`;
};

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandom = (brand: string[], model: string[], colors: string[]) => {
  const newCars = [];
  for (let i = 0; i < 100; i += 1) {
    const newCar = {
      name: `${brand[random(0, 9)]} ${model[random(0, 9)]}`,
      color: `${colors[random(0, 14)]}`,
    };
    newCars.push(newCar);
  }
  return newCars;
};
