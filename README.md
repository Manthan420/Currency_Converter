# Currency Converter

A simple currency converter built with **HTML, CSS and JavaScript**. Pick two currencies, enter an amount, and get the latest exchange rate.

---

## Features

- Convert between 150 currencies
- Country flags update when you change the currency
- Uses live exchange rates from a free API (no API key needed)
- Uses a backup API link if the main one is down
- Shows a clear message if something goes wrong

---

## Tech Stack

| Part | Technology |
|---|---|
| Structure | HTML |
| Styling | CSS |
| Logic | JavaScript (Fetch API, async/await) |
| Exchange rates | [Exchange API by Fawaz Ahmed](https://github.com/fawazahmed0/exchange-api) |
| Flags | [Flags API](https://flagsapi.com) |

---

## Files

```
├── index.html    # Page layout
├── style.css     # Styles
├── codes.js      # List of currency codes and their country codes (for flags)
└── app.js        # Fills the dropdowns, gets the rates, and shows the result
```

---

## How It Works

1. `codes.js` has a list of currency codes, like `USD: "US"`. The country code is used to show the flag.
2. `app.js` fills both dropdowns with these currencies.
3. When you click **Get Exchange Rate**, the app fetches the latest rates for the "From" currency and multiplies your amount by the rate for the "To" currency.

---

## How to Run It

No installation needed. Download the project and open `index.html` in your browser.

---

## Author

**Manthan Jayswal**

[GitHub](https://github.com/Manthan420) | [LinkedIn](https://www.linkedin.com/in/manthan-jayswal09)
