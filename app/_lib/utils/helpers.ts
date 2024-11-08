import { columnPlaceholders, placeholders } from "./constants";

export function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
}

export function getRandomPlaceholderColumn(usedColumnPlaceholders: string[]) {
  const availablePlaceholders = columnPlaceholders.filter(
    (placeholder) => !usedColumnPlaceholders.includes(placeholder),
  );

  const newPlaceholder =
    availablePlaceholders[
      Math.floor(Math.random() * availablePlaceholders.length)
    ];

  return newPlaceholder;
}
