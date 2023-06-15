/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { getDatas } from '../controllers/datasController.js';

const recipesDatas = await getDatas();

console.log('test reci