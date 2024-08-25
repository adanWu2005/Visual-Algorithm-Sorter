import React from 'react';
import { getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations } from '../SortingAlgorithms/SortingAlgorithms.js';
import './Sorter.css';

let ANIMATION_SPEED_MS = 1; 
let NUMBER_OF_ARRAY_BARS = window.innerWidth <= 768 ? (window.innerWidth <= 480 ? 40 : 90) : 210;
let WIDTH = '6px';
const PRIMARY_COLOR = '#0b3ead';
const SECONDARY_COLOR = 'red';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {  
      array: [],
      isSorting: false,
    };
  }

  componentDidMount() {
    this.randomArray();
  }

  randomArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(window.innerWidth <= 480 ? randomIntFromInterval(10, 380): randomIntFromInterval(10, 680));
    }
    this.setState({ array });
  }

  setSortingState(isSorting) {
    this.setState({ isSorting });
  }

  mergeSort() {
    this.setSortingState(true);
    setTimeout(() => {
      const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
      setTimeout(() => this.setSortingState(false), animations.length * ANIMATION_SPEED_MS);
    }, ANIMATION_SPEED_MS);
  }
  
  bubbleSort() {
    this.setSortingState(true);
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.setSortingState(false), animations.length * ANIMATION_SPEED_MS);
  }

  quickSort() {
    this.setSortingState(true);
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.setSortingState(false), animations.length * ANIMATION_SPEED_MS);
  }

  insertionSort() {
    this.setSortingState(true);
    const animations = getInsertionSortAnimations(this.state.array.slice());
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, value, isColorChange] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;

      if (isColorChange) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.height = `${value}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.setSortingState(false), animations.length * ANIMATION_SPEED_MS);
  }

  selectionSort() {
    this.setSortingState(true);
    const animations = getSelectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][2];
      if (isColorChange) {
        const [barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          for (let j = 0; j < arrayBars.length; j++) {
            arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
          }
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => this.setSortingState(false), animations.length * ANIMATION_SPEED_MS);
  }

  speedChange(event) {
    const speed = event.target.value;
    ANIMATION_SPEED_MS = speed ? parseFloat(speed) : 1; 
  }

  sizeChange(event){
    const size = event.target.value;
    if (size === "veryLarge"){
      NUMBER_OF_ARRAY_BARS = 210;
      WIDTH = '6px';
    } else if(size==="Large"){
      NUMBER_OF_ARRAY_BARS = 150;
      WIDTH = '9px';
    } else if (size === "Medium"){
      NUMBER_OF_ARRAY_BARS = 100;
      WIDTH = '14.5px';      
    } else if(size==="Small"){
      NUMBER_OF_ARRAY_BARS = 50;
      WIDTH = '33px';  
    } else if(size==="verySmall"){
      NUMBER_OF_ARRAY_BARS = 20;
      WIDTH = '80px';  
    }
    this.randomArray();
  }

  render() {
    const { array, isSorting } = this.state;

    return (
      <div className="appContainer">
        <h2 className="headerTitle">Welcome to the Visual Algorithm Sorter</h2>
        <div className="btnContainer">
          <button onClick={() => this.randomArray()} className="generateNew" disabled={isSorting}>
            New Array
          </button>
          <button onClick={() => this.bubbleSort()} className="bubbleSort" disabled={isSorting}>
            Bubble Sort
          </button>
          <button onClick={() => this.insertionSort()} className="insertionSort" disabled={isSorting}>
            Insertion Sort
          </button>
          <button onClick={() => this.mergeSort()} className="mergeSort" disabled={isSorting}>
            Merge Sort
          </button>
          <button onClick={() => this.selectionSort()} className="selectionSort" disabled={isSorting}>
            Selection Sort
          </button>
          <button onClick={() => this.quickSort()} className="quickSort" disabled={isSorting}>
            Quick Sort
          </button>
        </div>

        <div className="filterContainer">
          <div className="sizeOption">
            <label htmlFor="size">Size:</label>
            <select name="size" onChange={(event)=> this.sizeChange(event)} disabled={isSorting}>
              <option value="veryLarge">Very Large</option>
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
              <option value="verySmall">Very Small</option>
            </select>            
          </div>
          <div className="speedOption">
            <label htmlFor="speed">Speed:</label>
            <select name="speed" onChange={(event) => this.speedChange(event)} disabled={isSorting}> 
              <option value="1">1ms</option>
              <option value="2">2ms</option>
              <option value="4">4ms</option>
              <option value="10">10ms</option>
              <option value="20">20ms</option>
            </select>            
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
}
