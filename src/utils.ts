export type InstanceID = string;

function genUniqueId(): () => InstanceID {
  let id = 0;
  return function uniqueId(): InstanceID {
    return (id++).toString();
  }
}

export const uniqueId = genUniqueId();
