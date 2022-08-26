/* eslint-disable consistent-return */
import {
  CarType, DataNewWinner, DataParamsNewCar, WinnerParams,
} from './types';
import Car from '../garage/Car';
import { HEADERS, Path, SERVER_URL } from './constants';

export const getCars = async (pageNumber = 1) => {
  const resp = await fetch(`${SERVER_URL}${Path.garage}?${Path.page}=${pageNumber}&${Path.limit}=7`);
  const countCars = resp.headers.get('X-Total-Count');
  const arrCars = await resp.json();
  return {
    count: countCars as string,
    arr: arrCars as CarType[],
  };
};

export const getCar = async (id: number): Promise<CarType> => {
  const resp = await fetch(`${SERVER_URL}${Path.garage}/${id}`);
  const car = await resp.json();
  return car;
};

export const createCar = async (car: DataParamsNewCar): Promise<Car> => {
  const resp = await fetch(SERVER_URL + Path.garage, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(car),
  });
  const newCar = await resp.json();
  return newCar;
};

export const removeCar = async (id: number) => {
  const resp = await fetch(`${SERVER_URL}${Path.garage}/${id}`, { method: 'DELETE' });
  const deletedCar = await resp.json();
  return deletedCar;
};

export const updateCar = async (car: DataParamsNewCar, id: number) => {
  const resp = await fetch(`${SERVER_URL}${Path.garage}/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(car),
  });
  const updatedCar = await resp.json();
  return updatedCar;
};

export const getWinners = async (pageNumber = 1) => {
  const resp = await fetch(`${SERVER_URL}${Path.winners}?${Path.page}=${pageNumber}&${Path.limit}=10`);
  const countCars = resp.headers.get('X-Total-Count');
  const arrCars = await resp.json();
  return {
    count: countCars as string,
    arr: arrCars as WinnerParams[],
  };
};

export const startEngine = async (id: number) => {
  try {
    const resp = await fetch(`${SERVER_URL}${Path.engine}?id=${id}&status=started`, { method: 'PATCH' });
    const params = await resp.json();
    return { velocity: params.velocity, distance: params.distance };
  } catch (err) {
    throw new Error(err as string);
  }
};
export const stopEngine = async (id: number) => {
  try {
    const resp = await fetch(`${SERVER_URL}${Path.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
    const result = await resp.json();
    return result;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const switchToDrive = async (id: number) => {
  try {
    const resp = await fetch(`${SERVER_URL}${Path.engine}?id=${id}&status=drive`, { method: 'PATCH' });
    // const result = await resp.json();
    return resp;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const createWinner = async (car: DataNewWinner) => {
  try {
    const resp = await fetch(SERVER_URL + Path.winners, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(car),
    });
    const newWinner = resp;
    return newWinner;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getWinner = async (id: number) => {
  try {
    const resp = await fetch(`${SERVER_URL}${Path.winners}/${id}`, {
      method: 'GET',
    });
    const newWinner = resp;
    return newWinner;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const sort = async (page: number, params: string) => {
  try {
    const resp = await fetch(`${SERVER_URL}${Path.winners}?${params}`, {
      method: 'GET',
    });
    const newWinner = resp;
    return newWinner;
  } catch (err) {
    throw new Error(err as string);
  }
};
