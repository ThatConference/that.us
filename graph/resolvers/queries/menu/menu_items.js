import appertizers from './data/appetizers';

import appetizers from './data/appetizers';
import dinnersSeafood from './data/dinnersSeafood';
import dinnersLandfood from './data/dinnersLandfood';
import wraps from './data/wraps';
import drinks from './data/drinks';
import kids from './data/kids';
import salads from './data/salads';

export default {
  appetizers,
  dinners: [...dinnersSeafood, ...dinnersLandfood],
  wraps,
  drinks,
  kids,
  salads
};
