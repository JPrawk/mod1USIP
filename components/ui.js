export class UI {
  constructor(taskManager) {
    this.taskManager = taskManager;

    // Referencias
    this.input = document.getElementById('taskInput');
    this.button = document.getElementById('addBtn');
    this.list = document.getElementById('taskList');
    this.filterSelect = document.getElementById('filterSelect');
    this.sortBtn = document.getElementById('sortBtn');
    this.counter = document.getElementById('counter');

    // Eventos
    this.button.addEventListener('click', () => this.handleAddTask());
    this.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleAddTask(); });
    this.filterSelect.addEventListener('change', () => this.render());
    this.sortBtn.addEventListener('click', () => this.handleSort());

    this.render();
  }

  handleAddTask() {
    const text = this.input.value.trim();
    if (!text) return alert('Por favor, escribe una tarea.');
    this.taskManager.add(text);
    this.input.value = '';
    this.render();
  }

  handleSort() {
    // 3. Ordenar alfabéticamente
    this.taskManager.tasks.sort((a, b) => a.text.localeCompare(b.text));
    this.render();
  }

  render() {
    this.list.innerHTML = '';
    const filter = this.filterSelect.value;
    let tasks = this.taskManager.getAll();

    // 2. Filtros
    if (filter === 'pending') tasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') tasks = tasks.filter(t => t.completed);

    tasks.forEach(task => {
      const li = document.createElement('li');
      // 1. Remarcar en verde si está completado
      li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`;
      
      li.innerHTML = `
        <div class="d-flex flex-column">
          <span class="${task.completed ? 'completed-task' : ''} fw-bold">${task.text}</span>
          <small class="text-muted" style="font-size: 0.75rem;">Creado: ${task.date}</small>
        </div>
        <div>
          <button class="btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'} me-1">
            ${task.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
        </div>
      `;

      // Eventos de botones internos
      li.querySelector(task.completed ? '.btn-secondary' : '.btn-success').onclick = () => {
        this.taskManager.toggleComplete(task.id);
        this.render();
      };

      li.querySelector('.btn-danger').onclick = () => {
        this.taskManager.remove(task.id);
        this.render();
      };

      this.list.appendChild(li);
    });

    this.updateCounter();
  }

  updateCounter() {
    // 4. Contador Detallado
    const all = this.taskManager.getAll();
    const total = all.length;
    const completed = all.filter(t => t.completed).length;
    const pending = total - completed;

    this.counter.innerHTML = `
      <span class="badge bg-primary">Total: ${total}</span>
      <span class="badge bg-success">Completadas: ${completed}</span>
      <span class="badge bg-warning text-dark">Pendientes: ${pending}</span>
    `;
  }
}