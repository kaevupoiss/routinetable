import { writable, readable } from 'svelte/store';

export const weekdays = readable(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
export const tabletime_start = writable(6);
export const tabletime_end = writable(24);
export const tablecell_height = writable(10);
export const tableitems = writable([
  {
    id: 0,
    type: 0,
    head: '2047',
    details: 'Algoritmid, Praktikum',
    day: 0,
    time_start: 20,
    time_end: 24
  },
  {
    id: 1,
    type: 0,
    head: '1037',
    details: 'Algoritmid, Loeng',
    day: 2,
    time_start: 20,
    time_end: 24
  },
  {
    id: 2,
    type: 0,
    head: '2010',
    details: 'Tarkvaratehnika, Praktikum',
    day: 0,
    time_start: 24,
    time_end: 28
  }
]);

export let blocktypes = [
  {
    type: 0,
    color: '#2A9D8F',
    name: 'School'
  },
  {
    type: 1,
    color: '#E9C46A',
    name: 'Work'
  },
  {
    type: 2,
    color: '#F4A261',
    name: 'Transport'
  }
];

/*
export const tableitems = writable([
  {
    id: 1,
    type: 1,
    head: '2047',
    details: 'Algoritmid, Praktikum',
    day: 1,
    time_start: 20,
    time_end: 24
  },
  {
    id: 2,
    type: 1,
    head: '1037',
    details: 'Algoritmid, Loeng',
    day: 3,
    time_start: 20,
    time_end: 24
  },
  {
    id: 3,
    type: 1,
    head: '2010',
    details: 'Tarkvaratehnika, Praktikum',
    day: 1,
    time_start: 24,
    time_end: 28
  }
]);
*/