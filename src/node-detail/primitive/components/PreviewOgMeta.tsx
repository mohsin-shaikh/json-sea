import { Card, CSS, Text } from '@nextui-org/react';
import { memo, useMemo } from 'react';
import { isEmptyArray } from '../../../utils/array.util';
import { isString } from '../../../utils/json.util';
import { openLinkAsNewTab } from '../../../utils/window.util';
import { JsonLink } from '../hooks/useJsonLinkApi';

type Props = {
  jsonLink: JsonLink;
};

const _PreviewOgMeta = ({ jsonLink }: Props) => {
  const { title, description, images } = jsonLink;

  const textEllipsisCss: CSS = useMemo(
    () => ({
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
    []
  );

  if (!isString(title) && !isString(description) && isEmptyArray(images)) {
    return null;
  }

  return (
    <Card variant="bordered" isPressable onClick={() => openLinkAsNewTab(jsonLink.url)}>
      {images.length > 0 && (
        <Card.Body css={{ p: 0 }}>
          <Card.Image src={images[0]} objectFit="cover" width="100%" height={120} alt={title} />
        </Card.Body>
      )}

      <Card.Footer css={{ display: 'block', p: '$xs' }}>
        {isString(title) && (
          <Text css={{ ...textEllipsisCss, fontSize: '$sm', fontWeight: '$bold' }} title={title}>
            {title}
          </Text>
        )}

        {isString(description) && (
          <Text
            css={{ ...textEllipsisCss, color: '$accents7', fontSize: '$xs', fontWeight: '$medium' }}
            title={description}
          >
            {description}
          </Text>
        )}
      </Card.Footer>
    </Card>
  );
};

export const PreviewOgMeta = memo(_PreviewOgMeta);
