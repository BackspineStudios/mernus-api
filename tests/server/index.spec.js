import Server from '../../src/server';
import express from 'express';

describe('Server', () => {

  it('should return express on constructor', () => {
    const server = new Server();

    expect(server.app).not.toBe(undefined);
    expect(server.app.toString() === express().toString()).toBe(true);
  });

  it('should throw an exception if init without config', () => {
    const server = new Server();

    expect(() => {
      server.init();
    }).toThrow('server: Invalid config');
  });

  it('should init', async() => {
    // deactivate logger
    console.log = () => null;
    const server = new Server();
    const config = { port: 3002 };
    const listener = await server.init(config);

    expect(listener).not.toBe(undefined);
    expect(listener.toString() === express().listen().toString()).toBe(true);
  });

});
