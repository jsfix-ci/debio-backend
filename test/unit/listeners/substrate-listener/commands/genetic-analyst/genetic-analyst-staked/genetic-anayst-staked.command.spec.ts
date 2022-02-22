import { GeneticAnalystStakedCommand } from '../../../../../../../src/listeners/substrate-listener/commands/genetic-analysts';
import { createMockGeneticAnalyst, mockBlockNumber } from '../../../../../mock';
import { GeneticAnalyst } from '../../../../../../../src/common/polkadot-provider/models/genetic-analysts';

jest.mock(
  '../../../../../../../src/common/polkadot-provider/models/genetic-analysts',
);

describe('Genetic Analyst Staked Command Event', () => {
  it('should called model data and toHuman', () => {
    const geneticAnalyst = createMockGeneticAnalyst();

    const _ = // eslint-disable-line
      new GeneticAnalystStakedCommand([geneticAnalyst],mockBlockNumber());
    expect(GeneticAnalyst).toHaveBeenCalled();
    expect(GeneticAnalyst).toHaveBeenCalledWith(geneticAnalyst.toHuman());
    expect(geneticAnalyst.toHuman).toHaveBeenCalled();
  });

  it('should throw error if toHuman not defined', () => {
    expect(() => {
      const _ = // eslint-disable-line
        new GeneticAnalystStakedCommand([{}], mockBlockNumber());
    }).toThrowError();
  });
});