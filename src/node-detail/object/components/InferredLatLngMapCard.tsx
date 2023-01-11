import { LatLngTuple } from 'leaflet';
import dynamic from 'next/dynamic';
import { ComponentProps, memo } from 'react';
import { PropertyValueTable } from '../../primitive/components/PropertyValueTable';
import { InferredDataType } from '../enums/inferred-data-type.enum';
import { InferredDetailCard } from './InferredDetailCard';

const DynamicLeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
});

type Props = {
  latPropertyK: string;
  lngPropertyK: string;
  latLng: LatLngTuple;
};

const _InferredLatLngMapCard = ({ latPropertyK, lngPropertyK, latLng }: Props) => {
  return (
    <InferredDetailCard propertyKeys={[latPropertyK, lngPropertyK]} inferredDataType={InferredDataType.LatLngMap}>
      <DynamicLeafletMap latLng={latLng} />

      <PropertyValueTable
        rows={[
          {
            property: latPropertyK,
            value: latLng[0],
          },
          {
            property: lngPropertyK,
            value: latLng[1],
          },
        ]}
        ariaLabel="lat & lng table"
      />
    </InferredDetailCard>
  );
};

export const InferredLatLngMapCard = memo(_InferredLatLngMapCard);
export type InferredLatLngMapCardProps = ComponentProps<typeof InferredLatLngMapCard>;
