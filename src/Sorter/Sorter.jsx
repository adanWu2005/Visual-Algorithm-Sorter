import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations } from '../SortingAlgorithms/SortingAlgorithms.js';
import './Sorter.css';

let ANIMATION_SPEED_MS = 10; 
let NUMBER_OF_ARRAY_BARS = 100; // Default to 100 bars (max size)
let WIDTH = '4px'; // Default width for 100 bars
const PRIMARY_COLOR = '#0b3ead';
const SECONDARY_COLOR = 'red';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

export default function SortingVisualizer() {
  const navigate = useNavigate();
  const [array, setArray] = React.useState([]);
  const [isSorting, setIsSorting] = React.useState(false);
  const [sizeValue, setSizeValue] = React.useState(200); // Default to maximum size (100 bars)
  const [speedValue, setSpeedValue] = React.useState(10);  // Default to 10ms
  const animationIds = React.useRef([]); // Store animation IDs for cancellation

  const handleResize = React.useCallback(() => {
    // Recalculate bar widths when window is resized
    const arraySize = Math.round(2 + (sizeValue - 10) * (100 - 2) / (200 - 10));
    
    const pageWidth = window.innerWidth;
    const containerPadding = 40;
    const availableWidth = pageWidth - containerPadding;
    const barSpacing = 2;
    const totalSpacing = (arraySize - 1) * barSpacing;
    const barWidth = Math.max(2, (availableWidth - totalSpacing) / arraySize);
    
    NUMBER_OF_ARRAY_BARS = arraySize;
    WIDTH = `${barWidth}px`;
    
    randomArray();
  }, [sizeValue]);

  React.useEffect(() => {
    // Calculate initial width based on screen size and default sizeValue
    const arraySize = Math.round(2 + (sizeValue - 10) * (100 - 2) / (200 - 10));
    const pageWidth = window.innerWidth;
    const containerPadding = 40;
    const availableWidth = pageWidth - containerPadding;
    const barSpacing = 2;
    const totalSpacing = (arraySize - 1) * barSpacing;
    const barWidth = Math.max(2, (availableWidth - totalSpacing) / arraySize);
    
    NUMBER_OF_ARRAY_BARS = arraySize;
    WIDTH = `${barWidth}px`;
    
    randomArray();
    // Add window resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Clean up resize listener
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, sizeValue]);

  const randomArray = () => {
    const newArray = [];
    // Use a more reasonable height range for better visualization
    const minHeight = 10;
    const maxHeight = 400; // Reduced from 900 to 400 for better visual distribution
    
    // Create a more varied distribution by using different ranges
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      // Use a weighted distribution to create more variety
      const rand = Math.random();
      let height;
      
      if (rand < 0.3) {
        // 30% chance for short bars (10-150)
        height = randomIntFromInterval(minHeight, 150);
      } else if (rand < 0.7) {
        // 40% chance for medium bars (151-300)
        height = randomIntFromInterval(151, 300);
      } else {
        // 30% chance for tall bars (301-400)
        height = randomIntFromInterval(301, maxHeight);
      }
      
      newArray.push(height);
    }
    setArray(newArray);
  }

  const setSortingState = (sorting) => {
    setIsSorting(sorting);
  }

  const stopSorting = () => {
    // Clear all pending animations
    animationIds.current.forEach(id => clearTimeout(id));
    animationIds.current = [];
    
    // Reset all bars to primary color
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
    
    setSortingState(false);
  }

  const mergeSort = () => {
    setSortingState(true);
    animationIds.current = []; // Clear previous animation IDs
    
    const timeoutId = setTimeout(() => {
      const animations = getMergeSortAnimations(array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          const animationId = setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          animationIds.current.push(animationId);
        } else {
          const animationId = setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
          animationIds.current.push(animationId);
        }
      }
      const finalTimeoutId = setTimeout(() => setSortingState(false), animations.length * ANIMATION_SPEED_MS);
      animationIds.current.push(finalTimeoutId);
    }, ANIMATION_SPEED_MS);
    animationIds.current.push(timeoutId);
  }
  
  const bubbleSort = () => {
    setSortingState(true);
    animationIds.current = []; // Clear previous animation IDs
    
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        const animationId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      } else {
        const animationId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      }
    }
    const finalTimeoutId = setTimeout(() => setSortingState(false), animations.length * ANIMATION_SPEED_MS);
    animationIds.current.push(finalTimeoutId);
  }

  const quickSort = () => {
    setSortingState(true);
    animationIds.current = []; // Clear previous animation IDs
    
    const animations = getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        const animationId = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      } else {
        const animationId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      }
    }
    const finalTimeoutId = setTimeout(() => setSortingState(false), animations.length * ANIMATION_SPEED_MS);
    animationIds.current.push(finalTimeoutId);
  }

  const insertionSort = () => {
    setSortingState(true);
    animationIds.current = []; // Clear previous animation IDs
    
    const animations = getInsertionSortAnimations(array.slice());
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, value, isColorChange] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;

      if (isColorChange) {
        const animationId = setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      } else {
        const animationId = setTimeout(() => {
          barOneStyle.height = `${value}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      }

    }
    const finalTimeoutId = setTimeout(() => setSortingState(false), animations.length * ANIMATION_SPEED_MS);
    animationIds.current.push(finalTimeoutId);
  }

  const selectionSort = () => {
    setSortingState(true);
    animationIds.current = []; // Clear previous animation IDs
    
    const animations = getSelectionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        const animationId = setTimeout(() => {
          for (let j = 0; j < arrayBars.length; j++) {
            arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
          }
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      } else {
        const animationId = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        animationIds.current.push(animationId);
      }

    }
    const finalTimeoutId = setTimeout(() => setSortingState(false), animations.length * ANIMATION_SPEED_MS);
    animationIds.current.push(finalTimeoutId);
  }

  const speedChange = (event) => {
    const speed = parseInt(event.target.value);
    setSpeedValue(speed);
    ANIMATION_SPEED_MS = speed; 
  }

  const sizeChange = (event) => {
    const size = parseInt(event.target.value);
    setSizeValue(size);
    
    // Dynamically calculate array size and width based on slider value
    // Map slider range (10-200) to array size range (2-100)
    const arraySize = Math.round(2 + (size - 10) * (100 - 2) / (200 - 10));
    
    // Calculate dynamic width based on available page width
    const pageWidth = window.innerWidth;
    const containerPadding = 40; // Account for margins and padding
    const availableWidth = pageWidth - containerPadding;
    const barSpacing = 2; // Space between bars
    const totalSpacing = (arraySize - 1) * barSpacing;
    const barWidth = Math.max(2, (availableWidth - totalSpacing) / arraySize);
    
    // Update global variables
    NUMBER_OF_ARRAY_BARS = arraySize;
    WIDTH = `${barWidth}px`;
    
    randomArray();
  }

  const getSizeLabel = () => {
    // Calculate the actual array size for display
    const arraySize = Math.round(2 + (sizeValue - 10) * (100 - 2) / (200 - 10));
    return `${arraySize} bars`;
  }

  return (
    <div className="appContainer">  

      <h2 className="headerTitle">Welcome to the Visual Algorithm Sorter</h2>
      <div className="btnContainer">
        <button onClick={() => randomArray()} className="generateNew" disabled={isSorting}>
          New Array
        </button>
        <button onClick={() => bubbleSort()} className="bubbleSort" disabled={isSorting}>
          Bubble Sort
        </button>
        <button onClick={() => insertionSort()} className="insertionSort" disabled={isSorting}>
          Insertion Sort
        </button>
        <button onClick={() => mergeSort()} className="mergeSort" disabled={isSorting}>
          Merge Sort
        </button>
        <button onClick={() => selectionSort()} className="selectionSort" disabled={isSorting}>
          Selection Sort
        </button>
        <button onClick={() => quickSort()} className="quickSort" disabled={isSorting}>
          Quick Sort
        </button>
        {isSorting && (
          <button onClick={() => stopSorting()} className="stopSort" style={{ backgroundColor: '#dc3545', color: 'white', border: '2px solid #dc3545' }}>
            Stop
          </button>
        )}
      </div>

      <div className="filterContainer">
        <div className="sizeOption">
          <label htmlFor="size">Size: {getSizeLabel()}</label>
          <input 
            type="range" 
            id="size"
            min="10" 
            max="200" 
            value={sizeValue}
            onChange={(event) => sizeChange(event)} 
            disabled={isSorting}
            className="slider"
          />
        </div>
        <div className="speedOption">
          <label htmlFor="speed">Speed: {speedValue}ms</label>
          <input 
            type="range" 
            id="speed"
            min="10" 
            max="200" 
            value={speedValue}
            onChange={(event) => speedChange(event)} 
            disabled={isSorting}
            className="slider"
          />
        </div>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              width: WIDTH,
            }}></div>
        ))}
      </div>
    </div>
  );
}

