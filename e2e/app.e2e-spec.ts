import { OORSIWEBPage } from './app.po';

describe('oorsi-web App', function() {
  let page: OORSIWEBPage;

  beforeEach(() => {
    page = new OORSIWEBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
