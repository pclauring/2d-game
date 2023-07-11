export const gameObjectsToObjectPoints = (
  gameObjects: Object[] | null
): ObjectPoint[] => {
  if (!gameObjects) return [];
  return gameObjects.map((gameObject) => gameObject as ObjectPoint);
};
