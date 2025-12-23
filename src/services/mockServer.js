// src/services/mockServer.js
import { rest, setupWorker } from 'msw/lib/esm/index.js';

// In-memory DB
let serverData = {
  lists: [],
  cards: {}, // { listId: [card1, card2, ...] }
};

// Simulate delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Handlers
export const handlers = [
  // Get board
  rest.get('/api/board', async (req, res, ctx) => {
    await delay(200);
    return res(ctx.status(200), ctx.json(serverData));
  }),

  // Lists
  rest.post('/api/lists', async (req, res, ctx) => {
    const list = await req.json();
    serverData.lists.push(list);
    serverData.cards[list.id] = [];
    return res(ctx.status(201), ctx.json({ success: true }));
  }),

  rest.put('/api/lists/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const index = serverData.lists.findIndex((l) => l.id === id);
    if (index === -1) return res(ctx.status(404));
    serverData.lists[index] = { ...serverData.lists[index], ...updates };
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  rest.delete('/api/lists/:id', async (req, res, ctx) => {
    const { id } = req.params;
    serverData.lists = serverData.lists.filter((l) => l.id !== id);
    delete serverData.cards[id];
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  // Cards
  rest.post('/api/cards', async (req, res, ctx) => {
    const card = await req.json();
    if (!serverData.cards[card.listId]) serverData.cards[card.listId] = [];
    serverData.cards[card.listId].push(card);
    return res(ctx.status(201), ctx.json({ success: true }));
  }),

  rest.put('/api/cards/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    let found = false;
    for (const listId in serverData.cards) {
      const index = serverData.cards[listId].findIndex((c) => c.id === id);
      if (index !== -1) {
        serverData.cards[listId][index] = { ...serverData.cards[listId][index], ...updates };
        found = true;
        break;
      }
    }
    return res(ctx.status(found ? 200 : 404), ctx.json({ success: found }));
  }),

  rest.delete('/api/cards/:id', async (req, res, ctx) => {
    const { id } = req.params;
    for (const listId in serverData.cards) {
      serverData.cards[listId] = serverData.cards[listId].filter((c) => c.id !== id);
    }
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

// Setup worker
export const worker = setupWorker(...handlers);
