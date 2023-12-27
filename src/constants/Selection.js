export const roomOption = [
  { value: 'sowRoom1', label: 'SOW Room 1',},
  { value: 'sowRoom2', label: 'SOW Room 2'},
  { value: 'room1', label: '5th Room 1'}, //should be converted to room1 (API expects this format as it will be used to find the column name
  { value: 'room2', label: '5th Room 2'},
];

export const activityOption = [
  { value: 'Fellowship', label: 'Fellowship',},
  { value: 'Dedication', label: 'Dedication'},
  { value: 'Elders Meeting', label: 'Elders Meeting'}, //should be converted to room1 (API expects this format as it will be used to find the column name
  { value: 'Ministry Meeting', label: 'Ministry Meeting'},
  { value: 'Cluster Meeting', label: 'Cluster Meeting'},
];
