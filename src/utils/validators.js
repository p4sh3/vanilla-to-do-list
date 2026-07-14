export function validateTaskText(text) {
  const trimmed = text?.trim() ?? '';
  if (trimmed === '') {
    return { valid: false, message: 'Por favor escribe una tarea' };
  }
  return { valid: true, value: trimmed };
}