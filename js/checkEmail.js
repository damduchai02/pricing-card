export function checkEmail(email) {
  const regex = /^[^s@]+@[^s@]+.[^s@]+$/;

  return regex.test(email);
}
