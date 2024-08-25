export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function getBubbleSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    bubbleSortHelper(auxiliaryArray, animations);
    return animations;
  }
  
  function bubbleSortHelper(auxiliaryArray, animations) {
    const n = auxiliaryArray.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push([j, j + 1, true, true]); 
        if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
          animations.push([j, auxiliaryArray[j + 1], false]);
          animations.push([j + 1, auxiliaryArray[j], false]);
          let temp = auxiliaryArray[j];
          auxiliaryArray[j] = auxiliaryArray[j + 1];
          auxiliaryArray[j + 1] = temp;
        }
        animations.push([j, j + 1, true, false]); 
      }
    }
  }
  
export function getQuickSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(auxiliaryArray, low, high, animations) {
    if (low < high) {
      const pi = partition(auxiliaryArray, low, high, animations);
      quickSortHelper(auxiliaryArray, low, pi - 1, animations);
      quickSortHelper(auxiliaryArray, pi + 1, high, animations);
    }
  }
  
  function partition(auxiliaryArray, low, high, animations) {
    const pivot = auxiliaryArray[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push([j, high, true, true]);
      if (auxiliaryArray[j] < pivot) {
        i++;
        animations.push([i, auxiliaryArray[j], false]);
        animations.push([j, auxiliaryArray[i], false]);
        let temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[j];
        auxiliaryArray[j] = temp;
      }
      animations.push([j, high, true, false]);
    }
    animations.push([i + 1, auxiliaryArray[high], false]);
    animations.push([high, auxiliaryArray[i + 1], false]);
    let temp = auxiliaryArray[i + 1];
    auxiliaryArray[i + 1] = auxiliaryArray[high];
    auxiliaryArray[high] = temp;
    return i + 1;
  }
  
export function getInsertionSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    insertionSortHelper(auxiliaryArray, animations);
    return animations;
  }
  
  function insertionSortHelper(auxiliaryArray, animations) {
    const n = auxiliaryArray.length;
    for (let i = 1; i < n; i++) {
      let key = auxiliaryArray[i];
      let j = i - 1;

      animations.push([i, key, true]);

      while (j >= 0 && auxiliaryArray[j] > key) {
        animations.push([j + 1, auxiliaryArray[j], true]); 
        animations.push([j + 1, auxiliaryArray[j], false]); 
        auxiliaryArray[j + 1] = auxiliaryArray[j]; 
        j--;
      }

      auxiliaryArray[j + 1] = key;
      animations.push([j + 1, key, false]); 
    }
  }
  
  
export function getSelectionSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    selectionSortHelper(auxiliaryArray, animations);
    return animations;
  }
  
  function selectionSortHelper(auxiliaryArray, animations) {
    const n = auxiliaryArray.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        animations.push([j, minIdx, true, true]);
        if (auxiliaryArray[j] < auxiliaryArray[minIdx]) {
          minIdx = j;
        }
      }
      animations.push([minIdx, i, true, false]);
      if (minIdx !== i) {
        animations.push([i, auxiliaryArray[minIdx], false]);
        animations.push([minIdx, auxiliaryArray[i], false]);
        let temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[minIdx];
        auxiliaryArray[minIdx] = temp;
      }
    }
  }

  