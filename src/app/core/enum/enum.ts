// export type ServiceType = 'task'|'auth'|'profile';

// https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
const lit = <V extends keyof any>(v: V) => v;
export const ServiceType = {
  TASK: lit('task'),
  AUTH: lit('auth'),
  PROFILE: lit('profile')
};
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];

enum Num {
  GO = 'dfgdg',
  Go1 = 'ghgfh'
}
type B = [keyof typeof Num];

type ValueOf<T> = T[keyof T];

const yo = {
  nigga: 'gdfgdfg',
  nigga1: 'gfff'
};

type n = keyof typeof yo;

const Bow = {
  p1: '1',
  p2: lit('11'),
  p3: '11'
};
type Bow = keyof any;

enum Service {
  Task = 'task',
  Auth = 'auth',
  Profile = 'profile'
}

const aa: Service = Service.Task;
