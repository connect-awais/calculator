let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML.trim(); // Getting the button's text, removing extra spaces

        if (buttonText === '=') {
            try {
                // Replace minus signs that could cause issues in eval
                string = string.replace(/−/g, '-'); // Ensure proper minus sign for eval()
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
