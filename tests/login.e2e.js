// @ts-check
import { expect } from '@playwright/test';

import { test } from '../fixture.js';

const TEST_USER = process.env.TEST_USER
const TEST_PASSWD = process.env.TEST_PASSWD

test.describe.parallel('Login Page', () => {
  test.beforeEach(async () => {
  })

  test('Positive Login', async ({ loginPage, page }) => {
    await loginPage.enterLoginCredentials(TEST_USER, TEST_PASSWD)
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
    await expect(page).toHaveTitle('Logged In Successfully | Practice Test Automation')
    await expect(loginPage.loginHeading).toBeVisible()
    await expect(loginPage.loginSection).toContainText('Congratulations student. You successfully logged in!')
    await expect(loginPage.logoutBtn).toBeVisible()
  })

  test('Negative Username', async ({ loginPage }) => {
    await loginPage.enterLoginCredentials('fakeuser', TEST_PASSWD)
    await expect(loginPage.errorMsg).toBeVisible()
    await expect(loginPage.errorMsg).toHaveText('Your username is invalid!')
  })

  test('Negative Password', async ({ loginPage }) => {
    await loginPage.enterLoginCredentials(TEST_USER, 'fakepass')
    await expect(loginPage.errorMsg).toBeVisible()
    await expect(loginPage.errorMsg).toHaveText('Your password is invalid!')
  })
})
