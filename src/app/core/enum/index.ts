// export type ServiceType = 'task'|'auth'|'profile';

// https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
const lit = <V extends keyof any>(v: V) => v;
export const ServiceType = {
  TASK: lit('task'),
  AUTH: lit('auth'),
  PROFILE: lit('profile')
};
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
