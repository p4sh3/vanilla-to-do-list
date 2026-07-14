/**
 * Contrato que toda implementación de repositorio de tareas debe cumplir.
 * @interface
 */
export class ITaskRepository {
  getAll() { throw new Error('No implementado'); }
  save(tasks) { throw new Error('No implementado'); }
}