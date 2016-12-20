import { OorsiWebPage } from './app.po';

describe('oorsi-web App', function() {
  let page: OorsiWebPage;

  beforeEach(() => {
    page = new OorsiWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
