import express from 'express';
import { Router } from './router';

/**
 * Route Class Abstraction
 */
export abstract class Route implements Router {
  #name: string;
  #router = express.Router();

  /**
   * Constructor
   * @param name Route path prefix
   */
  constructor(name: string) {
    this.#name = name;
  }

  build(): void {
    throw new Error('Must be implemented by sub class.');
  }

  /**
   * Get the path prefix for this route
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Get the router for this route
   */
  get router(): express.Router {
    return this.#router;
  }
}
