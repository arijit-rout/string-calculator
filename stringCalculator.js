function add(numbers) {
    if (numbers === "") return 0;
  
    let delimiter = /,|\n/; 
  
    if (numbers.startsWith("//")) {
        const delimiterPart = numbers.match(/^\/\/(.+)\n/)[1];
        delimiter = new RegExp(`[${delimiterPart}]`);
        numbers = numbers.split("\n").slice(1).join("\n");
    }
  
    const numArray = numbers.split(delimiter).map(Number);
  
    const negatives = numArray.filter(n => n < 0);
    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }
  
    return numArray.reduce((sum, num) => sum + num, 0);
}

function getUserInput() {
    try {
        const input = prompt('Enter a string of numbers to calculate:');
        const result = add(input);
        alert(`Result: ${result}`);
    } catch (e) {
        alert(e.message);
    }
}

function runTests() {
    try {
        console.clear();
        console.log("Running Test Cases...");
  
        console.assert(add("") === 0, "Test Case 1 Failed: Empty string should return 0");
        console.assert(add("1") === 1, "Test Case 2 Failed: Single number should return 1");
        console.assert(add("1,5") === 6, "Test Case 3 Failed: '1,5' should return 6");
        console.assert(add("1\n2,3") === 6, "Test Case 4 Failed: '1\\n2,3' should return 6");
        console.assert(add("//;\n1;2") === 3, "Test Case 5 Failed: '//;\\n1;2' should return 3");
  
        try {
            add("-1,2");
            console.error("Test Case 6 Failed: Negative numbers should throw an exception");
        } catch (e) {
            console.assert(
                e.message === "Negative numbers not allowed: -1",
                "Test Case 6 Failed: Exception message should be 'Negative numbers not allowed: -1'"
            );
        }
  
        try {
            add("1,-2,-3");
            console.error("Test Case 7 Failed: Negative numbers should throw an exception");
        } catch (e) {
            console.assert(
                e.message === "Negative numbers not allowed: -2, -3",
                "Test Case 7 Failed: Exception message should list all negative numbers"
            );
        }
  
        console.log("All tests passed successfully!");
  
    } catch (error) {
        console.error(error.message);
    }
}

runTests();
getUserInput();
