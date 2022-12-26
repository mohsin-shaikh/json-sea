import { Table } from '@nextui-org/react';
import { addMinutes, format } from 'date-fns';
import { Key, memo, useEffect, useState } from 'react';
import { RelativeTimeFormatter } from './RelativeTimeFormatter';

type Props = {
  datetime: string;
};

type PropertyName = 'Unix(ms)' | 'Unix(s)' | 'GMT' | 'Your timezone' | 'Relative';

const PROPERTY_NAMES: PropertyName[] = ['Unix(ms)', 'Unix(s)', 'GMT', 'Your timezone', 'Relative'];

const COLUMNS = [
  {
    key: 'property',
    label: 'Property',
  },
  {
    key: 'value',
    label: 'Value',
  },
];

type Row = {
  property: string;
  value: string;
};

const _PreviewDatetime = ({ datetime }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const date: Date = new Date(datetime);
    const gmtDate: Date = addMinutes(date, date.getTimezoneOffset());

    const formatWithoutGMT: string = 'EEE, MMM M, yyyy, HH:mm:ss';
    const formatWithGMT: string = `${formatWithoutGMT} OOOO`;

    const unixTimestamp = date.getTime(); // (ms)

    const map: Record<PropertyName, string | number> = {
      'Unix(ms)': unixTimestamp,
      'Unix(s)': unixTimestamp / 1000,
      GMT: `${format(gmtDate, formatWithoutGMT)} GMT+00:00`,
      'Your timezone': format(date, formatWithGMT),
      Relative: unixTimestamp,
    };

    const rows: Row[] = PROPERTY_NAMES.map(
      (propertyName) =>
        ({
          property: propertyName,
          value: map[propertyName],
        } as Row)
    );

    setRows(rows);
  }, [datetime]);

  return (
    <Table
      lined
      sticked
      aria-label="datetime table"
      css={{
        height: 'auto',
        minWidth: '100%',
        padding: '$1',
      }}
    >
      <Table.Header columns={COLUMNS}>
        {({ key, label }) => (
          <Table.Column css={{ display: 'none' }} key={key}>
            {label}
          </Table.Column>
        )}
      </Table.Header>

      <Table.Body items={rows} css={{ fontSize: '$xs' }}>
        {(row) => (
          <Table.Row key={row.property}>
            {(columnKey: Key) => (
              <Table.Cell>
                {row.property === 'Relative' && columnKey === 'value' ? (
                  <RelativeTimeFormatter unixTimestamp={row[columnKey] as number} />
                ) : (
                  row[columnKey]
                )}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export const PreviewDatetime = memo(_PreviewDatetime);