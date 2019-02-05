var allowedChars = /^[a-z0-9\ ]+$/i;

const words = ["abc", "Abc", "123", "a123", "!abc", "a b", "a%b", "a b", "a  b "];

words.forEach(word => {
    console.log(word + " is " + (allowedChars.test(word) ? "allowed" : "not allowed"));
});