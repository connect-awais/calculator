let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";

// Function to handle the key presses
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Handle digits
    if (key >= '0' && key <= '9') {
        string += key;
        input.value = string;
    }

    // Handle operators and special keys
    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        string += key;
        input.value = string;
    }

    // Handle decimal point
    else if (key === '.') {
        string += key;
        input.value = string;
    }

    // Handle the equals key (Enter)
    else if (key === 'Enter') {
        try {
            string = string.replace(/−/g, '-');  // Ensure proper minus sign for eval()
            string = eval(string);  // Evaluate the expression safely
            input.value = string;  // Display the result in the input field
        } catch (error) {
            input.value = 'Error';  // Display error if something goes wrong in eval
            string = "";  // Reset the string for safety
        }
    }

    // Handle backspace
    else if (key === 'Backspace') {
        string = string.slice(0, -1);  // Remove the last character
        input.value = string;
    }

    // Prevent default behavior for keys we are handling
    e.preventDefault();
});

// Existing button click functionality remains the same
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML.trim(); // Getting the button's text, removing extra spaces

        if (buttonText === '=') {
            try {
                string = string.replace(/−/g, '-'); // Ensure proper minus sign for eval
                string = eval(string);  // Evaluate the expression safely
                input.value = string;   // Display the result in the input field
            } catch (error) {
                input.value = 'Error';  // Display error if something goes wrong in eval
                string = "";  // Reset the string for safety
            }
        } 
        else if (buttonText === 'AC') {
            string = "";  // Reset string
            input.value = string;
        } 
        else if (buttonText === 'DEL') {
            string = string.substring(0, string.length - 1);  // Remove last character
            input.value = string;
        } 
        else {
            // Handle the minus (-) sign carefully
            if (buttonText === '−' && (string === "" || /[+\-*/%]$/.test(string) || string === ".")) {
                string += '-';  // Append the minus sign correctly as `-` for eval
            } else {
                string += buttonText;  // Add button text to the string
            }
            input.value = string;  // Update input display
        }
    });
});
