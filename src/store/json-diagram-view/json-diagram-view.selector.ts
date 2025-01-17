import { selector } from 'recoil';
import { isNull } from '../../utils/json.util';
import { jsonTreeSelector } from '../json-engine/json-engine.selector';
import { SeaNode } from '../json-engine/types/sea-node.type';
import { JSON_DIAGRAM_VIEW_PREFIX, selectedNodeIdAtom } from './json-diagram-view.atom';

export const selectedSeaNodeSelector = selector<SeaNode | null>({
  key: `${JSON_DIAGRAM_VIEW_PREFIX}/selectedSeaNodeSelector`,
  get: ({ get }) => {
    const selectedNodeId: string | null = get(selectedNodeIdAtom);

    if (isNull(selectedNodeId)) {
      return null;
    }

    const { seaNodeEntities } = get(jsonTreeSelector);

    return seaNodeEntities[selectedNodeId] ?? null;
  },
});
