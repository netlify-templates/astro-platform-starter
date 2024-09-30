import type { BlobProps } from '@/types.ts';
import { randomInt } from '@/utils.ts';

export default function ShapePreview(props: BlobProps) {
  const { svgPath, parameters } = props;
  const gradientId = `gradient-${randomInt(10_000_000, 100_000_000)}`;

  return (
    <div className="p-8 border rounded-lg border-blue-200/30">
      <svg
        viewBox={`0 0 ${parameters.size} ${parameters.size}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: parameters.colors[0] }} />
            <stop offset="100%" style={{ stopColor: parameters.colors[1] }} />
          </linearGradient>
        </defs>
        <path d={svgPath} fill={`url(#${gradientId})`}></path>
      </svg>
    </div>
  );
}
