import { Badge } from '@nextui-org/react';
import { memo } from 'react';

type Props = {
  value: string;
};

const _NodeDetailBadge = ({ value }: Props) => {
  return (
    <Badge isSquared enableShadow variant="flat" color="default" size="lg">
      {value}
    </Badge>
  );
};

export const NodeDetailBadge = memo(_NodeDetailBadge);
