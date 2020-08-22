function genUniqueId(): () => string {
  let id = 0;
  return function uniqueId(): string {
    return (id++).toString();
  }
}

export const uniqueId = genUniqueId();
