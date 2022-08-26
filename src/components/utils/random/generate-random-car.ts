const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandom = (brand: string[], model: string[], colors: string[]) => {
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

export default generateRandom;
