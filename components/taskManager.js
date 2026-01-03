export class TaskManager {
  constructor() {
    this.tasks = [];
    this.load();
  }

  load() {
    const saved = localStorage.getItem('tasks');
    this.tasks = saved ? JSON.parse(saved) : [];
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  add(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      // 5. Fecha de creación
      date: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    this.tasks.push(newTask);
    this.save();
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  }

  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  getAll() {
    return this.tasks;
  }
}