var allowedChars = /^[a-z0-9\ ]+$/i;
var allowedCharsForUsername = /^[a-z0-9]+$/i;

var allowedCharsForEmail = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/

const emails = ["foo@bar.com", "abc", "a@b.org", "a.b@gmail.com", "AzA@aEb.biz", "no", "<script>", "help@co.uk", "#"];
const words = ["abc", "Abc", "123", "a123", "!abc", "a b", "a%b", "a b", "a  b "];

words.forEach(word => {
    console.log(word + " is " + (allowedCharsForUsername.test(word) ? "allowed" : "not allowed"));
});

emails.forEach(email =>{
    console.log(email + " is " + (allowedCharsForEmail.test(email) ? "allowed" : "not allowed"));
});