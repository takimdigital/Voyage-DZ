from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Landing Page
    page.goto("http://localhost:3000")
    page.screenshot(path="jules-scratch/verification/landing-page.png")

    # 2. Destinations Page
    page.goto("http://localhost:3000/destinations")
    page.screenshot(path="jules-scratch/verification/destinations-page.png")

    # 3. Blog Page
    page.goto("http://localhost:3000/blog")
    page.screenshot(path="jules-scratch/verification/blog-page.png")

    # 4. FAQ Page
    page.goto("http://localhost:3000/faq")
    page.screenshot(path="jules-scratch/verification/faq-page.png")

    # 5. Contact Page
    page.goto("http://localhost:3000/contact")
    page.screenshot(path="jules-scratch/verification/contact-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
