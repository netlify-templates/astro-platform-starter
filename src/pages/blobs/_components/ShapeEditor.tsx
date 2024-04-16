import { useState } from 'react';
import NewShape from './NewShape.tsx';
import StoredShapes from './StoredShapes.tsx';

export default function ShapeEditor() {
    const [lastMutationTime, setLastMutationTime] = useState<number>(null);

    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
                <NewShape setLastMutationTime={setLastMutationTime} />
            </div>
            <div className="flex-1">
                <StoredShapes lastMutationTime={lastMutationTime} />
            </div>
        </div>
    );
}
