export function formDataToObject<T>(data: FormData) {
  return Object.fromEntries(data.entries()) as T;
}

export function objectToFormData<T extends object>(obj: T) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData.set(key, value);
  }
  return formData;
}
