import { checkEmail } from './checkEmail.js';
import { checkPassword } from './checkPassword.js';
import { validateInput } from './validateInput.js';

const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

emailInput.addEventListener('input', function (e) {
  validateInput(e, checkEmail, 'Please provide a valid email address');
});

passwordInput.addEventListener('input', function (e) {
  validateInput(
    e,
    checkPassword,
    'Password should be at least 8 characters, including uppercase, lowercase, numbers and special characters'
  );
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const newUser = { email, password };

  try {
    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();

    if (data.id) {
      window.location.href = 'login.html';
    } else {
      alert(data.error);
    }
  } catch (error) {}
});
