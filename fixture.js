// fixture.js
import { test as baseTest } from '@playwright/test';

import { LoginPage } from './pom/loginPom.js';

export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  }
})
