import { ITaskRepository } from './ITaskRepository.js';

const STORAGE_KEY = 'tasks';

export class LocalStorageTaskRepository extends ITaskRepository {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error al leer tareas de localStorage:', error);
      return [];
    }
  }

  save(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }
}