export type TaskPriority = 'low'|'medium'|'high';

export interface ITaskData extends ITaskCreationalData {
  id: number;
  creationDate: Date;
  completed: boolean;
}

export interface ITaskRawData extends ITaskCreationalData {
  id: number;
  creationDate: string;
  completed: boolean;
}

export interface ITaskCreationalData {
  title: string;
  desc: string;
  proirity: TaskPriority;
}

export interface ISerializable<T> {
  serialize(): T;
}

export interface IDeserializable<R, T> {
  deserialize(rawData: R): T;
}

export interface IClonable<T> {
  clone(): T;
}

export class TaskData implements ITaskData, IClonable<TaskData>, IDeserializable<ITaskRawData, TaskData> {

  public id: number;
  public creationDate: Date;
  public completed: boolean;
  public title: string;
  public desc: string;
  public proirity: TaskPriority;

  constructor() {}

  deserialize(rawData: ITaskRawData): TaskData {
    this.id = rawData.id;
    this.creationDate = new Date(rawData.creationDate);
    this.completed = rawData.completed;
    this.title = rawData.title;
    this.desc = rawData.desc;
    this.proirity = rawData.proirity;
    return this;
  }

  clone(): TaskData {
    const copy = new TaskData();
    copy.id = this.id;
    copy.creationDate = this.creationDate;
    copy.completed = this.completed;
    copy.title = this.title;
    copy.desc = this.desc;
    copy.proirity = this.proirity;
    return copy;
  }
}
