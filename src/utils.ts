import { Cat } from './types';

// Fisher - Yates shuffle - copied from: https://bost.ocks.org/mike/shuffle/
export function shuffle(array: Cat[]) {
  const newArray = array;
  let currentIndex = newArray.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

export function findCardPairId(cardId: string): string {
  const cardIdEnding = parseInt(cardId.slice(-1), 10);
  const pairIdEnding = (cardIdEnding + 1) % 2;
  return cardId.slice(0, -1).concat(pairIdEnding.toString());
}
