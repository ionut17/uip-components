import { Direction } from "../models";
import { TGridSortPipe } from "./grid-sort.pipe";

const TEST_DATA = [
    { id: 1, title: 'AAA', body: 'Hello!'},
    { id: 2, title: 'Bbc', body: 'Hello!'},
    { id: 3, title: 'Cbc', body: 'Hello there!'},
    { id: 4, title: 'Dbc', body: 'Hello there!'},
    { id: 5, title: 'Ebc', body: 'Hello there!'},
    { id: 6, title: 'ZZZ', body: 'Hello there!'}
  ];

describe('GridSortPipe', () => {
  const pipe = new TGridSortPipe();

  it('sorts results', () => {
    expect(pipe.transform(TEST_DATA, { columnName: 'title', direction: Direction.ASC })[0].title).toBe('AAA');
    expect(pipe.transform(TEST_DATA, { columnName: 'title', direction: Direction.DESC })[0].title).toBe('ZZZ');
  });

});
