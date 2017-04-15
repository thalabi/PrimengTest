import { PrimengTestPage } from './app.po';

describe('primeng-test App', () => {
  let page: PrimengTestPage;

  beforeEach(() => {
    page = new PrimengTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
