export function createTask(id, text) {
  return {
    id,
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}