import { useState, useEffect } from 'react';
import ShapePreview from './ShapePreview.tsx';
import { generateBlob } from '../../../utils';
import type { BlobProps } from '../../../types.ts';

interface Props {
    lastMutationTime: number;
}

export default function StoredShapes(props: Props) {
    const { lastMutationTime } = props;
    const [keys, setKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>(null);
    const [previewData, setPreviewData] = useState<BlobProps>(null);

    const getBlobKeyList = async () => {
        console.log('Fetching keys...');
        const response = await fetch('/api/blobs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.keys) {
            setKeys(data.keys);
        }
    };

    const getBlobByKey = async (key: string) => {
        setSelectedKey(key);
        const params = new URLSearchParams({ key });
        const response = await fetch(`/api/blob/?${params}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (data.blob) {
            setPreviewData(generateBlob(data.blob));
        }
    };

    useEffect(() => {
        getBlobKeyList();
    }, [lastMutationTime]);

    return (
        <>
            <h2 className="mb-4 text-xl text-center sm:text-xl">Objects in Blob Store</h2>
            <div className="w-full bg-white rounded-lg">
                <div className="min-h-14 p-4 text-center">
                    {keys?.length ? (
                        <div className="space-y-1">
                            {keys.map((keyName) => (
                                <button
                                    key={keyName}
                                    className={
                                        'btn btn-ghost btn-sm btn-block text-neutral-900 font-normal' +
                                        (selectedKey === keyName ? ' bg-base-content/20 pointer-events-none' : '')
                                    }
                                    onClick={() => {
                                        getBlobByKey(keyName);
                                    }}
                                >
                                    {keyName}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <span className="text-neutral-900">Please upload some shapes!</span>
                    )}
                </div>
                {previewData && (
                    <div className="p-4 aspect-square text-primary border-t border-neutral-200">
                        <ShapePreview {...previewData} />
                    </div>
                )}
            </div>
        </>
    );
}
