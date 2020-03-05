import { PlaceNameFinderPipe } from './Place-Name-Finder.pipe';

describe('CityNamePipe', () => {
  it('create an instance', () => {
    const pipe = new PlaceNameFinderPipe();
    expect(pipe).toBeTruthy();
  });
});
