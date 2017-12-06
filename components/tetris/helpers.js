import _ from 'lodash';

const blocks = [
  { type: 'I', available: false, price: 1 },
  { type: 'O', available: true, price: 1 },
  { type: 'T', available: false, price: 1 },
  { type: 'S', available: false, price: 1 },
  { type: 'Z', available: false, price: 1 },
  { type: 'J', available: false, price: 1 },
  { type: 'L', available: false, price: 1 },
];
const colors = [
  { type: 'yellow', available: false, price: 1 },
  { type: 'purple', available: false, price: 1 },
  { type: 'red', available: true, price: 1 },
  { type: 'blue', available: false, price: 1 },
  { type: 'orange', available: false, price: 1 },
  { type: 'green', available: true, price: 1 },
  { type: 'skyblue', available: false, price: 1 },
];

export function createRandomBlock() {

  return {
    type: _.sample(blocks.filter(x => x.available)).type,
    color: _.sample(colors.filter(x => x.available)).type,
  };

}

export function belongs(color) {
  return colors.some(x => x.type === color);
}


