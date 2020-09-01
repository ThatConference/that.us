export const wordCount = sentence => sentence.split(' ').length;

export const isLongerThan = (sentence, numOfWords) =>
  wordCount(sentence) > numOfWords;

export const truncate = (sentence, numberOfWords = 25) => {
  let results = '';

  const split = sentence.split(' ');

  if (split.length > numberOfWords) {
    results = `${split.splice(0, numberOfWords).join(' ')}`;
  } else {
    results = sentence;
  }

  return results;
};
