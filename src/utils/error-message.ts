export default function errorMessage(code: number) {
  let result = '';
  if (code === 400) {
    result = 'a';
  }
  return result;
}
