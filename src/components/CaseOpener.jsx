
import { useState } from 'react';
import { motion } from 'framer-motion';
import openCase from '../api/open-case';

export default function CaseOpener({ caseId }) {
  const [rolling, setRolling] = useState(false);
  const [reward, setReward] = useState(null);

  const handleOpen = async () => {
    setRolling(true);
    setReward(null);
    const data = await openCase(caseId);
    setTimeout(() => {
      setReward(data.item);
      setRolling(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">{caseId}</h2>

      {rolling && (
        <div className="overflow-hidden h-24 bg-black rounded mb-4 border-2 border-yellow-400">
          <motion.div
            className="flex space-x-2 p-1"
            animate={{ x: -600 }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: 0 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs">
                ITEM
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {reward && (
        <div className="text-center mb-4">
          <p className="text-lg">🎉 Je kreeg:</p>
          <p className={`font-bold text-${ getColor(reward.rarity) }-400`}>{reward.name}</p>
          <p className="text-sm">Zeldzaamheid: {reward.rarity}</p>
        </div>
      )}

      <button
        onClick={handleOpen}
        disabled={rolling}
        className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
      >
        {rolling ? 'Bezig met openen...' : 'Open Case'}
      </button>
    </div>
  );
}

function getColor(rarity) {
  switch (rarity) {
    case 'covert': return 'red';
    case 'classified': return 'purple';
    case 'restricted': return 'blue';
    case 'mil-spec': return 'green';
    default: return 'gray';
  }
}
