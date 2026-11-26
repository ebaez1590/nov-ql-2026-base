import './style.css';
import { createRaffleService, type RandomGenerator } from './raffle';
import { mountApp } from './ui/app';
import { getAppElements } from './ui/elements';

const cryptoRandom: RandomGenerator = {
  nextInt(maxExclusive) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return (values[0] ?? 0) % maxExclusive;
  },
};

mountApp(getAppElements(document), createRaffleService(cryptoRandom));
