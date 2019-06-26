
/* istanbul ignore next */
export const express = {
  req: {
    ip: 'ip',
    method: 'method',
    originalUrl: 'url',
    startTime: new Date(),
  },
  res: {
    status: (status) => status,
    json: (data) => data,
  }
};

/* istanbul ignore next */
export const action = {
  active: true,
  path: '/mock',
  method: 'get',
  fn: () => null
};

