export default function getErrors(response) {
  const errors = [];
  if (response.message !== undefined) {
    errors.push(response.message);
  }
  if (response.errors !== undefined) {
    for (const key in response.errors) {
      if (response.errors.hasOwnProperty(key)) {
        errors.push(response.errors[key])
      }
    }
  }

  return errors;
}
