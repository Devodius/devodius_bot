import { helloWorld } from '../src/index';

describe('index devrait', () => {
  it('devrait logger hello world', () => {
    // Given
    console.log = jest.fn();

    // When
    helloWorld();

    // Then
    expect(console.log).toHaveBeenCalledWith('Hello World !!!');
  });
});