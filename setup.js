// setup.js
import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';

import { chromium } from '@playwright/test';

const requiredVars = ['BASE_URL', 'TEST_USER', 'TEST_PASSWD']

export default async config => {
    const root = process.cwd()
    const configFilename = `.env.test`
    const configFile = path.join(root, configFilename)
    dotenv.config({ path: configFile })

    if (!requiredVars.every(key => process.env[key])) {
        console.log(chalk.red([
            'Unable to run playwright tests.',
            `Please set ${requiredVars.filter(key => !process.env[key]).join(', ')} in ${configFilename} or on the command line.`,
            ''
        ].join('\n')))
        process.exit(1)
    }

    console.log('\n*&*&*&*&*& -- global setup starting -- &*&*&*&*&*\n')
    const browser = await chromium.launch()
    const context = await browser.newContext({ baseURL: process.env.BASE_URL })
    const page = await context.newPage()

    console.log('-- opening the login page')
    await page.goto('/login', { waitUntil: 'networkidle' })
    console.log('attempting to save redux state')
    await page.evaluate(() => localStorage.setItem('reduxState', JSON.stringify({ debugMode: true })))
    console.log(chalk.green('Saved redux state to localStorage'))
    await context.storageState({ path: 'state.json' })
    await browser.close()
    console.log('*&*&*&*&*& -- global setup finished -- &*&*&*&*&*\n')
}
