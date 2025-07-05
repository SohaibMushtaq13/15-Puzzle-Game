export default function createRandomArrays() {
  const result = [];
  const usedOrders = new Set();

  while (result.length < 20) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15, null];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Shuffle
    }
    const orderStr = arr.join(",");
    if (!usedOrders.has(orderStr)) {
      usedOrders.add(orderStr);
      result.push(arr);
    }
  }
  return result[Math.floor(Math.random() * 5)];
}
