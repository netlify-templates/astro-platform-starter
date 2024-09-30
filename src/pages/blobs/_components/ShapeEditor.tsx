import { useState } from 'react';
import NewShape from './NewShape.tsx';
import StoredShapes from './StoredShapes.tsx';

export default function ShapeEditor() {
  const [lastMutationTime, setLastMutationTime] = useState<number>(Date.now());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <NewShape setLastMutationTime={setLastMutationTime} />
      </div>
      <div>
        <StoredShapes lastMutationTime={lastMutationTime} />
      </div>
    </div>
  );
}
