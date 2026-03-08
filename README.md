1️⃣ What is the difference between var, let, and const?
Answer: 
Those are keyword to declare aspt as a Variable. 
The Difference is:
var --- ✅ Reassign ---- ✅ Redeclare ---- Scope(function scope)
let --- ✅ Reassign ---- ❌ Redeclare ---- Scope(block scope)
const - ❌ Reassign ---- ❌ Redeclare ---- Scope(block scope)

====================================================
2️⃣ What is the spread operator (...)?
Answer: 
The Spread operator is using on array or object to expand data.
Example: 
const numbers = [1,2,3];
const newNumbers = [...numbers,4,5];
Output: [1,2,3,4,5]
====================================================
3️⃣ What is the difference between map(), filter(), and forEach()?
Answer:
map() ------  Return: new array ----  Use: data transform
filter() ---  Return: new array ----  Use: condition check
forEach() --  Return: nothing ------  Use: loop only
====================================================
4️⃣ What is an arrow function?
Answer:
Arrow function is a short syntax function.
====================================================
5️⃣ What are template literals?
Answer:
Template Literal using into a string for variable insert. 

Example: 
const name = "Mehedi";
const age = 20;
const text = `My name is ${name} and I am ${age} years old`;
