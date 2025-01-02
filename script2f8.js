const fs = require('fs');

// Function to decode the value based on its base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate the mean of an array of numbers
function calculateMean(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}

// Function to calculate the standard deviation of an array based on a provided mean
function calculateStandardDeviation(arr, mean) {
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
}

// Function to detect outliers based on a threshold of standard deviations
function detectOutliers(points) {
    const yValues = points.map(point => point.y); // Extracting y-values from the points

    const mean = calculateMean(yValues);  // Calculate the mean of y-values
    const stdDev = calculateStandardDeviation(yValues, mean); // Calculate the standard deviation

    const threshold = 2; // Outliers are defined as values more than 2 standard deviations away from the mean

    // Filter points where the y-value is more than 2 standard deviations from the mean
    return points.filter(point => Math.abs(point.y - mean) > threshold * stdDev);
}

// Function to parse the JSON file and process the data to detect outliers
function findOutliersFromFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        const jsonData = JSON.parse(data);  // Parse the JSON data from the file
        const { n, k } = jsonData.keys;  // Extract keys n and k (though they're not used in this function)

        let points = [];

        // Loop through the JSON object and decode each data point
        Object.keys(jsonData).forEach(key => {
            if (key !== 'keys') {
                const base = parseInt(jsonData[key].base);
                const value = jsonData[key].value;
                const x = parseInt(key); // The key is the x-coordinate
                const y = decodeValue(base, value); // Decode the value to get the y-coordinate

                points.push({ x, y });
            }
        });

        // Detect outliers based on the data points
        const outliers = detectOutliers(points);

        console.log("Outliers found:", outliers);  // Output the detected outliers
    });
}

// Run the function on the given file to detect outliers
findOutliersFromFile('testcase2.json');
