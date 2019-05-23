'use strict';

export const getPing = {
  active: true,
  path: '/ping',
  method: 'get',
  fn: (req, res) => {
    res.responder.ok({
      message: 'pong',
      time: `${new Date().getTime() - req.startTime.getTime()}ms`,
    });
  }
};
