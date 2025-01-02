It made Shamir's Secret Sharing algorithm easier to use. This program's objective is to determine an unknown polynomial's constant term (c) from its given roots, which are stored in several bases. Lagrange interpolation is used in this implementation to determine the constant term.


Overview of the Issue
The degree m of the unknown polynomial defines it, and in order to get the coefficients of the polynomial, we require at least k = m + 1 points. With the y values encoded in various bases (binary, decimal, hexadecimal, etc.), the JSON input offers the points in a unique manner. The objective is to:

1. Parse the input in JSON.

2. Using the given base, decode the encoded values.

3. To determine the polynomial's constant term, c, apply Lagrange interpolation.

How to Use the codes
1. Verify that Node.js is installed on your computer.


2. Download the code or clone the repository.

3. Put the testcase.json input JSON file in the same directory as the script.

4. Use the command node script.js to launch the script.
