import { Text } from '@nextui-org/react';
import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { NodeType } from '../../store/json-engine/enums/node-type.enum';
import { addPrefixChain } from '../../store/json-engine/helpers/json-parser.helper';
import { ArrayNodeData } from '../../store/json-engine/types/sea-node.type';
import { hoveredNodeDetailsAtom } from '../../store/node-detail-view/node-detail-view.atom';
import { isEmptyArray } from '../../utils/array.util';
import { ROOT_NODE_NAME } from '../constants/root-node.constant';
import { ChainHandle } from './ChainHandle';
import { DefaultHandle } from './DefaultHandle';
import { HoveringBlueDot } from './HoveringBlueDot';
import { NodeShell } from './NodeShell';

/**
 * ArrayNode `<Handle>` Details
 *
 * source: can have if array includes at least one item.
 * target: always have except for RootNode.
 */
const _ArrayNode = ({ id, data }: NodeProps<ArrayNodeData>) => {
  const hoveredNodeDetails = useRecoilValue(hoveredNodeDetailsAtom);

  const { arrayIndex, items, isRootNode } = data;

  const isHoveredFromNodeDetail: boolean = hoveredNodeDetails.some(({ nodeId }) => nodeId === id);

  return (
    <NodeShell nodeId={id} nodeType={NodeType.Array}>
      {!isRootNode && <DefaultHandle id={id} type="target" />}
      <ChainHandle id={addPrefixChain(id)} type="target" />

      <Text css={{ margin: 'auto' }}>{isRootNode ? ROOT_NODE_NAME : arrayIndex}</Text>

      {!isEmptyArray(items) && <DefaultHandle id={id} type="source" />}

      {isHoveredFromNodeDetail && <HoveringBlueDot />}
      <ChainHandle id={addPrefixChain(id)} type="source" />
    </NodeShell>
  );
};

export const ArrayNode = memo(_ArrayNode);
