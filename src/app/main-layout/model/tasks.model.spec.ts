import { ITaskRawData, TaskData } from "./tasks.model";

describe('TaskData', () => {
  let taskData: TaskData;
  let rawData: ITaskRawData;

  beforeEach(() => {
    taskData = new TaskData();
    rawData = {
      id: 1,
      creationDate: '2022-02-24',
      completed: false,
      title: 'Buy a melon',
      desc: 'Go to a shop and buy a tasty melon',
      proirity: 'medium',
    }
  });

  it('should be created', () => {
    expect(taskData).toBeTruthy();
  });

  it('should be equal to itself', () => {
    const itself = taskData.deserialize(rawData);
    expect(taskData).toBe(itself);
  });

  it('should be equal to each field', () => {
    taskData.deserialize(rawData);

    expect(taskData.id).toBe(rawData.id);
    expect(taskData.completed).toBe(rawData.completed);
    expect(taskData.creationDate.getTime()).toBe(new Date(rawData.creationDate).getTime());
    expect(taskData.title).toBe(rawData.title);
    expect(taskData.desc).toBe(rawData.desc);
    expect(taskData.proirity).toBe(rawData.proirity);
  });

  it('should be cloned', () => {
    const clonedTaskData = taskData.clone();

    expect(clonedTaskData).not.toBe(taskData);
    expect(taskData.id).toBe(clonedTaskData.id);
    expect(taskData.completed).toBe(clonedTaskData.completed);
    expect(taskData.creationDate).toBe(clonedTaskData.creationDate);
    expect(taskData.title).toBe(clonedTaskData.title);
    expect(taskData.desc).toBe(clonedTaskData.desc);
    expect(taskData.proirity).toBe(clonedTaskData.proirity);
  });
});