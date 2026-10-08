// Free exchange rate API (no API key needed): https://github.com/fawazahmed0/exchange-api
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// Backup link, used if the main one is down
const BACKUP_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Fill both dropdowns with the currency codes from codes.js
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Get all exchange rates for one currency, e.g. "usd"
const getRates = async (currency) => {
  try {
    let response = await fetch(`${BASE_URL}/${currency}.json`);
    if (!response.ok) {
      throw new Error("Main API did not respond");
    }
    return await response.json();
  } catch (error) {
    // Try the backup link
    let response = await fetch(`${BACKUP_URL}/${currency}.json`);
    if (!response.ok) {
      throw new Error("Backup API did not respond");
    }
    return await response.json();
  }
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);
  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  // The API uses lowercase codes, like "usd"
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();

  msg.innerText = "Getting exchange rate...";

  try {
    let data = await getRates(from);
    let rate = data[from][to];

    if (rate === undefined) {
      msg.innerText = `Sorry, the rate from ${fromCurr.value} to ${toCurr.value} is not available.`;
      return;
    }

    let total = amtVal * rate;
    // 2 decimals normally, more for very small results (like 1 VND in USD)
    let finalAmount = total >= 0.01 ? total.toFixed(2) : total.toPrecision(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText =
      "Could not get the exchange rate. Check your internet connection and try again.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
