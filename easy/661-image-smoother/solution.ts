function imageSmoother(img: number[][]): number[][] {
  let smoothedImg: number[][] = [];
  // Iterate for each square
  for (let i: number = 0; i < img.length; i++) {
      smoothedImg.push([]);
      for(let j: number = 0; j < img[i].length; j++) {
          smoothedImg[i].push(calculateAverageOfCloseGrid(i, j, img));
      }
  }
  return smoothedImg;

  // Function that returns average
  function calculateAverageOfCloseGrid(i: number, j: number, img: number[][]): number {
      let sum = 0, count = 0;

      for (let k: number = -1; k < 2 && i + k < img.length; k++) {
          for (let l: number = -1; l < 2 && i + k >= 0 && l + j < img[0].length; l++) {
              if (l + j >= 0) {
                  sum += img[i + k][l + j];
                  count++;
              }
          }
      }
      
      return Math.floor(sum / count);
  }

  // New array result because we can't mess with the original
;
