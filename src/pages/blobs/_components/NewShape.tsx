import type { BlobProps } from '@/types.ts';
import { generateBlob, uploadDisabled } from '@/utils';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import ShapePreview from './ShapePreview.tsx';

interface Props {
  setLastMutationTime: Dispatch<SetStateAction<number>>;
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
    if (!blobData) {
      console.error('No blob data to upload');
      return;
    }
    const response = await fetch('/api/blobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blobData.parameters),
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
    <div className="text-center">
      <h3>New Random Shape</h3>
      <div className="w-full bg-white rounded-lg mb-6">
        <div className="text-center mb-6 mt-4">
          {blobData && <code>{blobData.parameters?.name}</code>}
        </div>
        {blobData && <ShapePreview {...blobData} />}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="btn btn-primary" onClick={randomizeBlob}>
          Randomize
        </button>
        <button
          className="btn btn-primary"
          onClick={uploadBlob}
          disabled={uploadDisabled || wasUploaded || !blobData}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
