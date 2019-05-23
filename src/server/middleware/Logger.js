'use strict';

export class Logger {

  constructor(request) {
    this.request = request;
  }

  logRequest() {
    const { request } = this;
    console.info(`Executing [${request.ip}] [${request.method}] ${request.originalUrl}`);
  }

  logSuccess() {
    const { request } = this;
    const endTime = new Date().getTime() - request.startTime.getTime();
    console.info(`Executed  [${request.ip}] [${request.method}] ${request.originalUrl} ${endTime}ms`);
  }

  logError(status, error) {
    const { request } = this;
    const endTime = new Date().getTime() - request.startTime.getTime();
    console.error(`Executed [${request.ip}] [${request.method}] ${request.originalUrl} ${error.message} [${status}] ${endTime}ms`);
  }
}
