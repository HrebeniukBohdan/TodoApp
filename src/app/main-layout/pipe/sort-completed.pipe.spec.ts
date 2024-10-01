import { ITaskData } from '@main-layout/model/tasks.model';
import { SortCompletedPipe } from './sort-completed.pipe';

describe('SortCompletedPipe', () => {
  let pipe: SortCompletedPipe;

  beforeEach(() => {
    pipe = new SortCompletedPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null when input is null', () => {
    const result = pipe.transform(null);
    expect(result).toBeNull();
  });

  it('should return an empty array when input is an empty array', () => {
    const result = pipe.transform([]);
    expect(result).toEqual([]);
  });

  it('should sort tasks by completed status', () => {
    const tasks: ITaskData[] = [
      {
        id: 1,
        creationDate: new Date('2023-09-01'),
        completed: true,
        title: 'Task 1',
        desc: 'Description for Task 1',
        proirity: 'medium'
      },
      {
        id: 2,
        creationDate: new Date('2023-09-02'),
        completed: false,
        title: 'Task 2',
        desc: 'Description for Task 2',
        proirity: 'high'
      },
      {
        id: 3,
        creationDate: new Date('2023-09-03'),
        completed: true,
        title: 'Task 3',
        desc: 'Description for Task 3',
        proirity: 'low'
      },
      {
        id: 4,
        creationDate: new Date('2023-09-04'),
        completed: false,
        title: 'Task 4',
        desc: 'Description for Task 4',
        proirity: 'medium'
      }
    ];

    const result = pipe.transform(tasks);

    expect(result).toEqual([
      {
        id: 2,
        creationDate: new Date('2023-09-02'),
        completed: false,
        title: 'Task 2',
        desc: 'Description for Task 2',
        proirity: 'high'
      },
      {
        id: 4,
        creationDate: new Date('2023-09-04'),
        completed: false,
        title: 'Task 4',
        desc: 'Description for Task 4',
        proirity: 'medium'
      },
      {
        id: 1,
        creationDate: new Date('2023-09-01'),
        completed: true,
        title: 'Task 1',
        desc: 'Description for Task 1',
        proirity: 'medium'
      },
      {
        id: 3,
        creationDate: new Date('2023-09-03'),
        completed: true,
        title: 'Task 3',
        desc: 'Description for Task 3',
        proirity: 'low'
      }
    ]);
  });

  it('should not modify the original array', () => {
    const tasks: ITaskData[] = [
      {
        id: 1,
        creationDate: new Date('2023-09-01'),
        completed: true,
        title: 'Task 1',
        desc: 'Description for Task 1',
        proirity: 'medium'
      },
      {
        id: 2,
        creationDate: new Date('2023-09-02'),
        completed: false,
        title: 'Task 2',
        desc: 'Description for Task 2',
        proirity: 'high'
      }
    ];

    const originalTasks = [...tasks];
    pipe.transform(tasks);

    // Перевіряємо, що оригінальний масив не змінився
    expect(tasks).toEqual(originalTasks);
  });

  it('should handle tasks with all completed or all not completed', () => {
    const completedTasks: ITaskData[] = [
      {
        id: 1,
        creationDate: new Date('2023-09-01'),
        completed: true,
        title: 'Task 1',
        desc: 'Description for Task 1',
        proirity: 'medium'
      },
      {
        id: 2,
        creationDate: new Date('2023-09-02'),
        completed: true,
        title: 'Task 2',
        desc: 'Description for Task 2',
        proirity: 'high'
      }
    ];

    const notCompletedTasks: ITaskData[] = [
      {
        id: 1,
        creationDate: new Date('2023-09-01'),
        completed: false,
        title: 'Task 1',
        desc: 'Description for Task 1',
        proirity: 'medium'
      },
      {
        id: 2,
        creationDate: new Date('2023-09-02'),
        completed: false,
        title: 'Task 2',
        desc: 'Description for Task 2',
        proirity: 'high'
      }
    ];

    // Всі completed завдання залишаються на своїх місцях
    expect(pipe.transform(completedTasks)).toEqual(completedTasks);

    // Всі not completed завдання залишаються на своїх місцях
    expect(pipe.transform(notCompletedTasks)).toEqual(notCompletedTasks);
  });
});
