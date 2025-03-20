import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import ShapePreview from './ShapePreview.tsx';
import { generateBlob, uploadDisabled } from '../../../utils';
import type { BlobProps } from '../../../types.ts';

interface Props {
    setLastMutationTime?: Dispatch<SetStateAction<number>>;
}

export default function NewShape(props: Props) {
    const { setLastMutationTime } = props;
    const [blobData, setBlobData] = useState<BlobProps>();
    const [wasUploaded, setWasUploaded] = useState<boolean>(false);

    const randomizeBlob = () => {
        setBlobData(generateBlob());
        setWasUploaded(false);
    };

    const uploadBlob = async () => {
        const response = await fetch('/api/blobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blobData.parameters)
        });
        const data = await response.json();
        if (data.message) {
            console.log(data.message);
        }
        setWasUploaded(true);
        setLastMutationTime(Date.now());
    };

    useEffect(() => {
        if (!blobData) {
            randomizeBlob();
        }
    }, [blobData]);

    return (
        <>
            <h2 className="mb-4 text-xl text-center sm:text-xl">New Random Shape</h2>
            <div className="w-full mb-6 bg-white rounded-lg">
                <div className="p-4 text-center text-gray-900 border-b border-gray-200 min-h-14">{blobData && <span>{blobData.parameters?.name}</span>}</div>
                <div className="p-4 aspect-square text-primary">{blobData && <ShapePreview {...blobData} />}</div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <button className="btn" onClick={randomizeBlob}>
                    Randomize
                </button>
                <button className="btn" onClick={uploadBlob} disabled={uploadDisabled || wasUploaded || !blobData}>
                    Upload
                </button>
            </div>
        </>
    );
}
