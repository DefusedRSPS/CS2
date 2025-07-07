
import lootTable from '../lootTable';

export default function openCase(caseId) {
  const roll = Math.random();
  let cumulative = 0;
  let chosen = lootTable[0];

  for (const item of lootTable) {
    cumulative += item.chance;
    if (roll <= cumulative) {
      chosen = item;
      break;
    }
  }

  return Promise.resolve({ item: chosen });
}
