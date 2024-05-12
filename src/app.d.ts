// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session } from 'svelte-kit-cookie-session';

type SessionData = {
  id: number;
  name: string;
};

declare global {
  namespace App {
    interface Error {
      code: string;
    }
    interface Locals {
      session: Session<SessionData>;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
