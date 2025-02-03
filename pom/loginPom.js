// @ts-check
import dotenv from 'dotenv';

import { expect } from '@playwright/test';

dotenv.config()

export class LoginPage {
    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page
        this.usernameTbox = page.getByLabel('Username')
        this.passwordTbox = page.getByLabel('Password')
        this.submitBtn = page.getByRole('button', { name: 'Submit' })
        this.loginHeading = page.getByRole('heading', { name: 'Logged In Successfully' })
        this.loginMsg = page.getByText('Congratulations student. You successfully logged in!')
        this.loginSection = page.locator('#loop-container')
        this.logoutBtn = page.getByRole('link', { name: 'Log out' })
        this.errorMsg = page.locator('#error')
      }

      async goto() {
        if (!process.env.BASE_URL) {
          throw new Error('BASE_URL is not defined. Check your .env file.')
      }
      await this.page.goto(process.env.BASE_URL)
      }

      /**
   * @param {string} username
   * @param {string} password
   */
      async enterLoginCredentials(username, password) {
        await this.usernameTbox.fill(username)
        await expect(this.usernameTbox).toHaveValue(username)
        await this.passwordTbox.fill(password)
        await this.submitBtn.click()
      }
}
