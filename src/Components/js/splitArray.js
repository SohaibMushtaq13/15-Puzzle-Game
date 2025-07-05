export default function splitIntoChunks(arr, chunks) {
  const result = [];
  const size = Math.ceil(arr.length / chunks);

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
