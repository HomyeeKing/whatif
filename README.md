# whatif

[![npm version](https://badgen.net/npm/v/whatif)](https://npm.im/whatif) [![npm downloads](https://badgen.net/npm/dm/whatif)](https://npm.im/whatif)

## Install

```bash
npm i whatif
```

## Usage

### orSome

Imagine you have a list of conditions and you want to find the which condition cause the branch to be taken.

```js
if (a || b || c) {
  // can't tell which condition is true
  // especially when you want to give users more exact log
  console.log("reason:", "?")
}
```

Usually we may try to use `if` statement again to check the exact condition, but it's too verbose and too ugly.

```js
// 😕
if (a || b || c) {
  if (a) {
    console.log("Due to a ...")
  }
  if (b) {
    console.log("Due to b ...")
  }
}
```

Now, you can use `orSome` to do this. i.e.

```js
import { orSome } from "whatif"

// simple boolean array
orSome([true, false], (p) => {
  console.log(p.key) // 0.  when pass a boolean array, the key will be the index
})

// with object
orSome(
  [
    { condition: false, key: "one" },
    { condition: true, key: "two", message: "condition two pass" },
  ],
  (p) => {
    console.log(p.key) // two
    console.log(p.message) // condition two pass
  },
)

// mix boolean and object
orSome([false, { condition: true, key: "two" }], (p) => {
  console.log(p.key) // two.
  console.log(p.message) // condition two pass
})

// callback won't be called
orSome([false, false], () => {
  // won't be called
})
```
