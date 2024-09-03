import { InversePipe } from './inverse.pipe';

describe('InversePipe', () => {
  it('create an instance', () => {
    const pipe = new InversePipe();
    expect(pipe).toBeTruthy();
  });
});
