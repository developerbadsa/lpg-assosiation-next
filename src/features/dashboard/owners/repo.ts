import {env} from '@/lib/env';
import {mockDelay} from '@/lib/mockDelay';
import {MOCK_OWNERS} from './mock';
import type {OwnerRow} from './types';

//  import your existing input type from register-owner feature
import type {RegisterOwnerInput} from './register-owner/types';

export type OwnersRepo = {
  listUnverified: () => Promise<OwnerRow[]>;
  listVerified: () => Promise<OwnerRow[]>;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  addSection: (id: string) => Promise<void>;

  registerOwner: (input: RegisterOwnerInput) => Promise<void>;
};

// In-memory store for mock mode
let store: OwnerRow[] = structuredClone(MOCK_OWNERS);

const mockOwnersRepo: OwnersRepo = {
  async listUnverified() {
    await mockDelay(250);
    return store.filter((o) => o.status === 'UNVERIFIED').map((o) => ({...o}));
  },
  async listVerified() {
    await mockDelay(250);
    return store.filter((o) => o.status === 'VERIFIED').map((o) => ({...o}));
  },
  async approve(id) {
    await mockDelay(300);
    store = store.map((o) => (o.id === id ? {...o, status: 'VERIFIED'} : o));
  },
  async reject(id) {
    await mockDelay(300);
    store = store.filter((o) => o.id !== id);
  },
  async addSection() {
    await mockDelay(250);
  },

  //  mock register
  async registerOwner(input) {
    await mockDelay(350);

    // Create a new row without guessing your full OwnerRow shape:
    // use an existing row as template + merge input safely.
    const template = store[0] ?? ({} as OwnerRow);

    const next: OwnerRow = {
      ...structuredClone(template),
      ...(input as Partial<OwnerRow>),
      id: `own_${Date.now()}`,
      status: 'UNVERIFIED',
    };

    store = [next, ...store];
  },
};

const apiOwnersRepo: OwnersRepo = {
  async listUnverified() {
    throw new Error('API repo not implemented yet');
  },
  async listVerified() {
    throw new Error('API repo not implemented yet');
  },
  async approve() {
    throw new Error('API repo not implemented yet');
  },
  async reject() {
    throw new Error('API repo not implemented yet');
  },
  async addSection() {
    throw new Error('API repo not implemented yet');
  },

  async registerOwner() {
    throw new Error('API repo not implemented yet');
  },
};

export const ownersRepo = env.dataMode === 'mock' ? mockOwnersRepo : apiOwnersRepo;
