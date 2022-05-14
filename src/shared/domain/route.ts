import express from 'express';
import { Router } from './router';

export abstract class Route implements Router {
  private _name: String;

  private _router = express.Router();

  constructor(name: String) {
    this._name = name;
  }

  build(): void {
    throw new Error('Must be implemented by sub class.');
  }

  get name(): String {
    return this._name;
  }

  get router(): express.Router {
    return this._router;
  }
}
