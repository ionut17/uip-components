import { TGridPaginatePipe } from "./grid-paginate.pipe";

const TEST_DATA = [
    { id: 1, title: 'AAA', body: 'Hello!'},
    { id: 2, title: 'Bbc', body: 'Hello!'},
    { id: 3, title: 'Cbc', body: 'Hello there!'},
    { id: 4, title: 'Dbc', body: 'Hello there!'},
    { id: 5, title: 'Ebc', body: 'Hello there!'},
    { id: 6, title: 'ZZZ', body: 'Hello there!'}
  ];

describe('GridPaginatePipe', () => {
  const pipe = new TGridPaginatePipe();

  it('paginates results', () => {
    expect(pipe.transform(TEST_DATA, 0, 5).length).toBe(5);
    expect(pipe.transform(TEST_DATA, 1, 5).length).toBe(1);
    expect(pipe.transform(TEST_DATA, 2, 5).length).toBe(0);
    expect(pipe.transform(TEST_DATA, -1, 0).length).toBe(0);
  });

});
