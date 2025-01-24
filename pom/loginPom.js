import dotenv from 'dotenv';

import { expect } from '@playwright/test';

dotenv.config()
const BASE_URL = process.env.BASE_URL

export class LoginPage {
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
        await this.page.goto(BASE_URL)
      }

      async enterLoginCredentials(username, password) {
        await this.usernameTbox.fill(username)
        await expect(this.usernameTbox).toHaveValue(username)
        await this.passwordTbox.fill(password)
        await this.submitBtn.click()
      }
}
