const fs = require('fs');

// Decodes a value given its base (converts a base-N value to base-10)
function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

// Performs Lagrange interpolation on given points
function computeLagrangeInterpolation(points, totalPoints) {
    let constantTerm = 0;

    for (let i = 0; i < totalPoints; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        // Compute the Lagrange basis polynomial
        for (let j = 0; j < totalPoints; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= -xj / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return constantTerm;
}

// Determines the constant term (c) by processing the provided data
function determineConstant(jsonData) {
    let n = jsonData.keys.n;
    let k = jsonData.keys.k;

    let points = [];

    // Extract the points from the JSON data
    Object.keys(jsonData).forEach(key => {
        if (key !== 'keys') {
            let base = parseInt(jsonData[key].base);
            let value = jsonData[key].value;
            let x = parseInt(key);  // The key serves as the x-value
            let y = decodeBaseValue(base, value);  // Decode the y-value based on its base
            points.push({ x, y });
        }
    });

    // Sort points by x-value to ensure correct order for interpolation
    points.sort((a, b) => a.x - b.x);  

    return computeLagrangeInterpolation(points, k);
}

// Main function that processes all test cases and logs results
function handleTestCases(testCases) {
    testCases.forEach((testCase, index) => {
        let result = determineConstant(testCase);
        console.log(`The constant term (c) for test case ${index + 1} is: ${result}`);
    });
}

// Read and process test case files
const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

const testCases = [testCase1, testCase2];

// Process the test cases
handleTestCases(testCases);
