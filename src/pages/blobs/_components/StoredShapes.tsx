import type { BlobProps } from '@/types.ts';
import { generateBlob } from '@/utils';
import { useEffect, useState } from 'react';
import ShapePreview from './ShapePreview.tsx';

interface Props {
  lastMutationTime: number;
}

export default function StoredShapes(props: Props) {
  const { lastMutationTime } = props;
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<BlobProps | null>(null);

  const getBlobKeyList = async () => {
    const response = await fetch('/api/blobs', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.keys) {
      setKeys(data.keys);
    }
  };

  const getBlobByKey = async (key: string) => {
    setSelectedKey(key);
    if (!key) {
      setPreviewData(null);
      return;
    }
    const params = new URLSearchParams({ key });
    const response = await fetch(`/api/blob/?${params}`, {
      method: 'GET',
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
    <div className="text-center">
      <h3>Objects in Blob Store</h3>
      <div className="w-full bg-white rounded-lg">
        {keys?.length ? (
          <select onChange={(e) => getBlobByKey(e.target.value)} className="mb-4">
            <option value="">Select a shape</option>
            {keys.map((keyName) => (
              <option key={keyName} value={keyName}>
                {keyName}
              </option>
            ))}
          </select>
        ) : (
          <span className="block mb-4 italic text-neutral-900">Please upload some shapes!</span>
        )}
      </div>
      {previewData && <ShapePreview {...previewData} />}
    </div>
  );
}
