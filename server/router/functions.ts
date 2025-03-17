import dotenv from 'dotenv'
dotenv.config()

export function cleanText(text: string): string {
  return text.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "").trim();
}

export function cosineSimilarity(str1: string, str2: string) {
  const words1 = str1.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");
  const words2 = str2.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");

  const allWords = new Set([...words1, ...words2]);

  const vec1 = Array.from(allWords).map(word => words1.filter(w => w === word).length);
  const vec2 = Array.from(allWords).map(word => words2.filter(w => w === word).length);

  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val ** 2, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val ** 2, 0));

  return magnitude1 * magnitude2 === 0 ? 0 : dotProduct / (magnitude1 * magnitude2);
}

export const chunkArray = (arr: any[], size: number = 49) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, (i + 1) * size)
  );
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))