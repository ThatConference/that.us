export const truncate = (sentence, numberOfWords = 25) => {
  let results = '';

  const split = sentence.split(' ');

  if (split.length > numberOfWords) {
    results = `${split.splice(0, numberOfWords).join(' ')} ...`;
  } else {
    results = sentence;
  }

  return results;
};
