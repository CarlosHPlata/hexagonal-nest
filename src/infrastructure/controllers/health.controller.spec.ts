import { createSandbox } from 'sinon';
import { HealthController } from './health.controller';

const sandbox = createSandbox();

describe('GetPurchaseOrders Controller', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    healthController = new HealthController();
  });

  afterEach(() => sandbox.restore());

  it('should return run if everything was ok', async () => {
    const send = sandbox.stub().returns({ message: 'ok', version: 13 });
    const status = sandbox.stub().returns({ send });
    const mockResponse: any = { status };

    await healthController.testHealth(mockResponse);

    expect(mockResponse.status).toBeCalled();
    expect(send).toBeCalled();
  });

  it('should return run if everything was ok', async () => {
    sandbox.restore();
    const send = sandbox.stub().throws(new Error());
    const status = sandbox.stub().returns({ send });
    const mockResponse: any = { status };

    try {
      await healthController.testHealth(mockResponse);
    } catch (e) {
      expect(mockResponse.status).toBeCalled();
      expect(send).toBeCalled();
      expect(e).toEqual(new Error());
    }
  });
});
