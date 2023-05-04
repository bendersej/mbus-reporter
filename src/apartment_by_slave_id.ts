type SlaveId = string;
export type ApartmentBySlaveId = Record<
  SlaveId,
  {
    type: 'cold_water' | 'hot_water';
    apartmentNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  }
>;
export const apartmentBySlaveId: ApartmentBySlaveId = {
  '17120395': { type: 'cold_water', apartmentNumber: 5 },
  '17120399': { type: 'cold_water', apartmentNumber: 7 },
  '17120401': { type: 'cold_water', apartmentNumber: 6 },
  '17120405': { type: 'cold_water', apartmentNumber: 9 },
  '17120407': { type: 'cold_water', apartmentNumber: 3 },
  '17120409': { type: 'cold_water', apartmentNumber: 10 },
  '17120413': { type: 'cold_water', apartmentNumber: 4 },
  '17120415': { type: 'cold_water', apartmentNumber: 8 },
  '17120417': { type: 'cold_water', apartmentNumber: 1 },
  '17120419': { type: 'cold_water', apartmentNumber: 2 },
  '17180386': { type: 'cold_water', apartmentNumber: 12 },
  '17180390': { type: 'cold_water', apartmentNumber: 11 },
  '17340306': { type: 'hot_water', apartmentNumber: 1 },
  '17340308': { type: 'hot_water', apartmentNumber: 8 },
  '17340310': { type: 'hot_water', apartmentNumber: 6 },
  '17340314': { type: 'hot_water', apartmentNumber: 7 },
  '17340316': { type: 'hot_water', apartmentNumber: 12 },
  '17340318': { type: 'hot_water', apartmentNumber: 3 },
  '17340320': { type: 'hot_water', apartmentNumber: 11 },
  '17340322': { type: 'hot_water', apartmentNumber: 9 },
  '17340324': { type: 'hot_water', apartmentNumber: 10 },
  '17340326': { type: 'hot_water', apartmentNumber: 2 },
  '17340328': { type: 'hot_water', apartmentNumber: 4 },
  '17340330': { type: 'hot_water', apartmentNumber: 5 },
};
