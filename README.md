# Task 
Prototyp edytora dla redaktora bloga o kryptowalutach.

Zadaniem jest przygotowanie przykładowego okna tekstowego, które będzie
pozwalało na wprowadzanie treści wraz z odpowiednimi znacznikami danych. W
bliźniaczym oknie obok, wpisany tekst powinien zostać przekształcony w taki
sposób, by znaczniki były już zastąpione wynikiem działania odpowiedniej metody
wywołanej z odpowiednim argumentem. Każdy znacznik będzie przyjmować
następujące formatowanie:
{{ NazwaMetody/argument }}.
Dane pozwalające na realizację zadania powinny zostać pobrane z serwisu
coinpaprica (https://api.coinpaprika.com). UWAGA. Maksymalny limit wysyłanych
zapytań do API wynosi 10/s.
Ewentualne błędy powinny być wyświetlone pod oknami wejścia i wyjścia.
W wersji zadania podstawowego, edytor powinien umożliwiać interpretację tylko
jednej metody: Name, przyjmującej argument symbol (String) i zwracający pełną
nazwę instrumentu (String). Przykład: {{ Name/BTC }} -> Bitcoin.
W wersji zaawansowanej zadania należy przygotować dodatkową metodę,
pozwalająca na wypisanie aktualnego kursu danej kryptowaluty.

# Sample input:
In 1998, Wei Dai published a description of "b-money", characterized as an
anonymous, distributed electronic cash system.[Shortly thereafter, Nick Szabo
described bit gold. Like {{ Name/BTC }} and other cryptocurrencies that would
follow it, bit gold (not to be confused with the later gold-based exchange, {{
Name/BITGOLD }}) was described as an electronic currency system which required
users to complete a proof of work function with solutions being cryptographically
put together and published. A currency system based on a reusable proof of work
was later created by Hal Finney who followed the work of Dai and Szabo.

The first decentralized cryptocurrency, {{ Name/BTC }}, was created in 2009 by
pseudonymous developer Satoshi Nakamoto. It used SHA-256, a cryptographic
hash function, as its proof-of-work scheme. In April 2011, {{ Name/NMC }} was
created as an attempt at forming a decentralized DNS, which would make internet
censorship very difficult. Soon after, in October 2011, {{ Name/LTC }} was released. It
was the first successful cryptocurrency to use scrypt as its hash function instead of
SHA-256. Another notable cryptocurrency, {{ Name/PPC }} was the first to use a
proof-of-work/proof-of-stake hybrid.

# TheCoinest

A simple application that implements the requirements from the recruitment task.

Supported methods:
#### Price: {{ Price/BTC }} 
#### Name: {{ Name/BTC }}

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
