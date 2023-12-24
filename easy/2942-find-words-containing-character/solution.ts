function findWordsContaining(words: string[], x: string): number[] {
    /*
    Array<String>
    Char x
    Return array: number
    (for any words containing 'x')
  
    So we're searching for a character inside words
    */

    // Attempt 1 (Success):

    // let arrayOfMatchingIndices: number[] = [];
    // for (let i: number = 0; i < words.length; i++) {
    //   for (let j: number = 0; j < words[i].length; j++) {
    //     if (words[i][j] === x) {
    //       arrayOfMatchingIndices.push(i);
    //       break;
    //     }
    //   }
    // }
    // return arrayOfMatchingIndices;

    /*
    I believe I can do the same with a map function
    */

    return words.flatMap((word, index) => word.includes(x) ? index : []);
}