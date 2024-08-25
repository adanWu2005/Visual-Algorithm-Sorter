# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Visual Sorting Algorithm

This React application displays a visual depiction of various prominent sorting algorithms, allowing users to observe how they work in real time. Users can choose between multiple algorithms, change the speed of the animations, and specify the size of the dataset being sorted.

### Features

- **Multiple Sorting Algorithms**: The app includes implementations of various sorting algorithms, including:
  - Merge Sort
  - Quick Sort
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
- **Customizable Speed**: Adjust the speed of the sorting animations, with options ranging from very fast to extra slow.
- **Array Size Options**: Choose between different array sizes (Large, Medium, Small) to visualize sorting on different scales.
- **Responsive Design**: The app adjusts its layout and functionality based on screen size for optimal user experience.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

The project is organized as follows:

- **`src/`**: Contains the source code of the application.
  - **`components/`**: Contains the sorting visualizer.
  - **`SortingAlgorithms/`**: Contains all the sorting algorithms.
  - **`App.js`**: The main component that integrates everything.
  - **`index.js`**: The entry point of the application.

## Sorting Algorithms Explained

### Merge Sort
Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and then merges them back together in sorted order.

### Quick Sort
Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array into elements less than the pivot and elements greater than the pivot, recursively sorting the partitions.

### Bubble Sort
Bubble Sort is a simple comparison-based algorithm where adjacent elements are compared and swapped if they are in the wrong order, repeatedly passing through the array until it is sorted.

### Insertion Sort
Insertion Sort builds the sorted array one element at a time, picking elements from the unsorted portion and placing them in the correct position within the sorted portion.

### Selection Sort
Selection Sort divides the array into a sorted and an unsorted region, repeatedly selecting the smallest (or largest) element from the unsorted region and moving it to the end of the sorted region.

## How to Use the App

1. **Generate a New Array**: Click the "New Array" button to generate a new random dataset to sort.
2. **Select a Sorting Algorithm**: Choose any of the available sorting algorithms to start the visualization.
3. **Adjust Speed and Size**: Use the dropdown menus to adjust the speed of the animations and the size of the dataset.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The project was inspired by the need to visualize and understand how different sorting algorithms work.
- Built with the power of React.js and modern web development practices.
