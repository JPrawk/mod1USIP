import { TaskManager } from './components/taskManager.js';
import { UI } from './components/ui.js';

window.onload = () => {
  const manager = new TaskManager();
  new UI(manager);
};