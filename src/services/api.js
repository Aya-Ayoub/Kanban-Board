// Simulated API endpoints with delays/failures
export async function fetchBoard() {
  return simulateNetwork({ lists: [], cards: {} });
}

export async function createList(list) {
  return simulateNetwork(list);
}

export async function updateList(list) {
  return simulateNetwork(list);
}

export async function updateCard(card) {
  return simulateNetwork(card);
}

export async function simulateNetwork(data) {
  // Simulate random delay and failure
  await new Promise(r => setTimeout(r, Math.random() * 500 + 200));

  if (Math.random() < 0.05) {
    return Promise.reject({ message: "Network Error" });
  }

  return data;
}
