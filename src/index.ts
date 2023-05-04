import { readFileSync, writeFileSync } from 'fs';
import neatCsv from 'neat-csv';
import { apartmentBySlaveId, ApartmentBySlaveId } from './apartment_by_slave_id';

type CSVRow = {
  Date: string;
  Time: string;
  'Addr.': string;
  'ID-no.': keyof ApartmentBySlaveId;
  MAN: string;
  'No.': '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  Value: string;
  Unit: string;
  Description:
    | 'fabrication #'
    | 'volume'
    | 'time point'
    | 'operating time'
    | 'firmware version #'
    | 'software version #'
    | 'M-Bus state';
  Type: 'instant.';
  Device: '0';
  'St.-No.': '0';
  Tariff: '0';
};

type ConsumptionPerApartment = {
  [apartmentNumber: number]: {
    hotWater: {
      endOfMonthConsumption: number;
      currentConsumption: number;
    };
    coldWater: {
      endOfMonthConsumption: number;
      currentConsumption: number;
    };
  };
};

(async () => {
  const consumptionCSV = readFileSync('consumption_data.csv', 'utf-8');

  const parsedCSV: CSVRow[] = await neatCsv(consumptionCSV);

  const isWaterConsumptionRow = (row: CSVRow) => row.Description === 'volume';

  const waterConsumptionRows = parsedCSV.filter(isWaterConsumptionRow);

  const consumptionPerApartment = waterConsumptionRows.reduce<ConsumptionPerApartment>((memo, curr) => {
    const currentSlaveID = curr['ID-no.'];
    const matchingApartment = apartmentBySlaveId[currentSlaveID] ?? null;

    if (matchingApartment === null) {
      throw new Error(`Missing apartment match for slave ID ${currentSlaveID}`);
    }

    const currentSlaveConsumptionNumber = curr['No.'];

    const isCurrentConsumption = currentSlaveConsumptionNumber === '2';
    const isEndOfMonthConsumption = currentSlaveConsumptionNumber === '4';

    const currentApartmentValues = memo[matchingApartment.apartmentNumber] ?? {};
    const isHotWater = matchingApartment.type === 'hot_water';
    const isColdWater = matchingApartment.type === 'cold_water';

    if (!isHotWater && !isColdWater) {
      throw Error(`Unexpected consumption type: ${matchingApartment.type}`);
    }

    if (!isCurrentConsumption && !isEndOfMonthConsumption) {
      throw Error(`Unexpected consumption period: ${currentSlaveConsumptionNumber}`);
    }

    const valueInCubicMeters = (parseFloat(curr['Value']) / 1000).toFixed(3);

    if (isHotWater) {
      return {
        ...memo,
        [matchingApartment.apartmentNumber]: {
          ...currentApartmentValues,
          hotWater: {
            ...currentApartmentValues.hotWater,
            [isEndOfMonthConsumption ? 'endOfMonthConsumption' : 'currentConsumption']: valueInCubicMeters,
          },
        },
      };
    }

    return {
      ...memo,
      [matchingApartment.apartmentNumber]: {
        ...currentApartmentValues,
        coldWater: {
          ...currentApartmentValues.coldWater,
          [isEndOfMonthConsumption ? 'endOfMonthConsumption' : 'currentConsumption']: valueInCubicMeters,
        },
      },
    };
  }, {});

  const consumptionToReport: `krt ${string} ${'K' | 'S'},${number}`[] = Object.entries(consumptionPerApartment)
    .sort(([aptA], [aptB]) => (parseInt(aptA, 10) > parseInt(aptB, 10) ? 1 : -1))
    .flatMap(([apartment, consumption]) => [
      `krt ${apartment} K,${consumption.coldWater.endOfMonthConsumption}` as const,
      `krt ${apartment} S,${consumption.hotWater.endOfMonthConsumption}` as const,
    ]);

  const fileName = `readings/näidud_${new Date().getFullYear()}_${new Date().getMonth() + 1}.csv`;

  writeFileSync(fileName, ['krt number,nit', ...consumptionToReport].join('\n'));
})();
