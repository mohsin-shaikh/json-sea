import { Edge, Node } from 'reactflow';
import { selector } from 'recoil';
import { generateNodes } from '../../json-diagram/helpers/json-diagram.helper';
import { isValidJson } from '../../utils/json.util';
import { jsonParser } from './helpers/json-parser.helper';
import { JSON_ENGINE_PREFIX, latestValidStringifiedJsonAtom, stringifiedJsonAtom } from './json-engine.atom';

export const isValidJsonSelector = selector<boolean>({
  key: `${JSON_ENGINE_PREFIX}/isValidJsonSelector`,
  get: ({ get }) => {
    const stringifiedJson: string = get(stringifiedJsonAtom);
    return isValidJson(stringifiedJson);
  },
});

export const latestValidJsonSelector = selector<object>({
  key: `${JSON_ENGINE_PREFIX}/latestValidJsonSelector`,
  get: ({ get }) => {
    const latestValidStringifiedJson: string = get(latestValidStringifiedJsonAtom);
    return JSON.parse(latestValidStringifiedJson);
  },
});

export const nodesAndEdgesSelector = selector<[Node[], Edge[]]>({
  key: `${JSON_ENGINE_PREFIX}/nodesAndEdgesSelector`,
  get: ({ get }) => {
    const latestValidJson: object = get(latestValidJsonSelector);
    const { nodes, edges } = jsonParser(latestValidJson);

    return [generateNodes(nodes), edges];
  },
});