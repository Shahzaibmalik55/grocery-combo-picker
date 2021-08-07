# Online Grocery Combo Picker

Combo Picker of Grocery Items.

## Tech stack

- React 16.x (with Typescript)
- Redux 7.x
- Typescript 4.x
- React dom 17.x
- React mock store 1.x
- React script 4.x
- Redux toolkit 1.x

## Installation and use

- Clone project run `git clone https://github.com/Shahzaibmalik55/grocery-combo-picker.git`
- Run `yarn install`
- Run `npm start`

## Project Structure

- src
  - **components** (All reuseable components)
  - **container** (All page containers, parent component which calls data API'S and pass data to components)
  - **slices** (Redux actions and reducers)
  - **types** (Application Redux state and prop types)
  - **utils** (All reusable and helper functions)
  - **App.tsx** (Render whole Application)
  - **index.tsx** (render App component with redux store)
  - **index.css** (global CSS)
  - **store.ts** (create redux store with thunk middleware)

- public
  - **Items.json**
  - **categories.json**
  - **Other files**
