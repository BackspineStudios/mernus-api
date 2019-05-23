'use strict';

export class Responder {

  constructor(req, res, logger) {
    this.request = req;
    this.response = res;
    this.logger = logger;
  }

  ok(data) {
    const { response, logger } = this;

    logger.logSuccess();
    response.status(200).json({
      result: data || null,
    });
  }

  error(code, err) {
    const { response, logger } = this;
    const statusCode = code || 500;
    let error;

    if (!(err instanceof Error)) {

      error = new Error(err);
    }

    logger.logError();
    response.status(statusCode).json({
      error: error.message,
    });
  }
}
