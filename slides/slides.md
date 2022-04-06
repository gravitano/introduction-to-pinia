---
theme: seriph
# background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
title: Welcome to Slidev
---

<img src="https://pinia.vuejs.org/logo.svg" class="mx-auto w-20">

# Introduction to Pinia

Warsono &middot; Chapter Lead Frontend at GITS Indonesia

---

# What is Pinia?

Pinia is a store library for Vue, it allows you to share a state across components/pages.

- Pinia started as an experiment to redesign what a Store for Vue could look like with the Composition API around November 2019
- Pinia works for both Vue 2 and Vue 3 and doesn't require you to use the composition API
- The API is the same for both except for installation and SSR

---

# Why should I use Pinia?

Pinia is a store library for Vue, it allows you to share a state across components/pages.

- Devtools support
  - A timeline to track actions, mutations
  - Stores appear in components where they are used
  - Time travel and easier debugging
- Hot module replacement
  - Modify your stores without reloading your page
  - Keep any existing state while developing
- Plugins: extend Pinia features with plugins
- Proper TypeScript support or autocompletion for JS users
- Server Side Rendering Support

---

# Store Concepts

- A Store (like Pinia) is an entity holding state and business logic that isn't bound to your Component tree.
- In other words, it hosts global state.
- It has three concepts, the `state`, `getters` and `actions`
- it's safe to assume these concepts are the equivalent of `data`, `computed` and `methods` in components.

---

# When should I use a Store

- A store should contain data that can be accessed throughout your application
- This includes data that is used in many places:
  - e.g. User information that is displayed in the navbar
- You should avoid including in the store local data that could be hosted in a component instead
  - e.g. the visibility of an element local to a page.
- Not all applications need access to a global state

---

# Installation

Project Scafollding

```bash
npm init vue@latest
```

```bash {5}
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formating? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

---

# Adding to existing project

Step-by-step installation

Install `pinia` with your favorite package manager:

```bash
yarn add pinia
# or with npm
npm install pinia
```

Create a pinia (the root store) and pass it to the app:

```js
// main.js
import { createPinia } from 'pinia';

app.use(createPinia());
```

---

# Defining a store

```ts {all|2|4|5-7|8-9|10-12|13-17}
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

---

# Defining a Store with Composition API

```js
import { ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

---

# Using the store

```vue {all|2|6|9|11|13}
<script>
import { useCounterStore } from '@/stores/counter';

export default {
  setup() {
    const counter = useCounterStore();

    // mutation
    counter.count++;
    // with autocompletion ✨
    counter.$patch({ count: counter.count + 1 });
    // or using an action instead
    counter.increment();

    return {
      store,
    };
  },
};
</script>
```

---

# Destructuring Store

Destructuring store will breaks reactivity

```ts
export default defineComponent({
  setup() {
    const store = useCounterStore();
    // ❌ This won't work because it breaks reactivity
    // it's the same as destructuring from `props`
    const { name, doubleCount } = store;

    name; // "eduardo"
    doubleCount; // 2

    return {
      // will always be "eduardo"
      name,
      // will always be 2
      doubleCount,
      // this one will be reactive
      doubleValue: computed(() => store.doubleCount),
    };
  },
});
```

---

# Destructuring Store

Use `storeToRefs` to destructure store

```ts
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, doubleCount } = storeToRefs(store)
    // the increment action can be just extracted
    const { increment } = store

    return {
      name,
      doubleCount
      increment,
    }
  },
})
```

---

# Core Concepts

- State
- Getters
- Actions

---

# State

The state is, most of the time, the central part of your store

```ts
import { defineStore } from 'pinia';

const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    };
  },
});
```

---

# Accessing & Resetting The State

By default, you can directly read and write to the state by accessing it through the `store` instance:

```ts
const store = useStore();

console.log(store.counter); // 0

store.counter++;

console.log(store.counter); // 1
```

<br>
<br>

### Resetting the state

You can reset the state to its initial value by calling the `$reset()` method on the store:

```ts
const store = useStore();

store.$reset();
```

---

# Usage with `setup()`

```ts
import { useCounterStore } from '../stores/counterStore';

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  computed: {
    tripleCounter() {
      return this.counterStore.counter * 3;
    },
  },
};
```

---

# Usage without `setup()`

```ts
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // gives access to this.counter inside the component
    // same as reading from store.counter
    ...mapState(useCounterStore, ['counter'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'counter',
      // you can also write a function that gets access to the store
      double: store => store.counter * 2,
      // it can have access to `this` but it won't be typed correctly...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

---

# Modifiable state

```ts
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // gives access to this.counter inside the component and allows setting it
    // this.counter++
    // same as reading from store.counter
    ...mapWritableState(useCounterStore, ['counter'])
    // same as above but registers it as this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'counter',
    }),
  },
}

```

---

# Mutating the state

```ts
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam',
});
```

---

# Getters

Getters are exactly the equivalent of **computed values** for the state of a Store

```ts
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1;
    },
  },
});
```

---

# Passing arguments to getters

```ts
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
});
```

and use in component:

```vue
<script setup>
const store = useStore();
</script>
<template>
  <p>User 2: {{ store.getUserById(2) }}</p>
</template>
```

---

# Getters are not cached anymore

Note that when doing this, getters are not cached anymore, they are simply functions that you invoke.

```ts
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active);
      return (userId) => activeUsers.find((user) => user.id === userId);
    },
  },
});
```

---

# Accessing other stores getters

```ts {all|1|9|10}
import { useOtherStore } from './other-store';

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore();
      return state.localData + otherStore.data;
    },
  },
});
```

---

# Usage with `setup()`

```ts {all|3|5|6}
export default {
  setup() {
    const store = useStore();

    store.counter = 3;
    store.doubleCount; // 6
  },
};
```

---

# Usage with the Options API and with `setup()`

```ts {all|5-7|10-12}
import { useCounterStore } from '../stores/counterStore';

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2;
    },
  },
};
```

---

# Without `setup()`

```ts
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // gives access to this.doubleCounter inside the component
    // same as reading from store.doubleCounter
    ...mapState(useCounterStore, ['doubleCount'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // you can also write a function that gets access to the store
      double: store => store.doubleCount,
    }),
  },
}
```

---

# Actions

Actions are the equivalent of `methods` in components

```ts
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
});
```

---

# Fetching API inside Actions

`Actions` can be asynchronous, you can `await` inside of them any API call or even other actions!

```ts {all|7|10-20}
import { mande } from 'mande';

const api = mande('/api/users');

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
  }),
  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password });
        showTooltip(`Welcome back ${this.userData.name}!`);
      } catch (error) {
        showTooltip(error);
        // let the form component display the error
        return error;
      }
    },
  },
});
```

---

# Calling Actions

You are also completely free to set whatever arguments you want and return anything.

```ts
export default defineComponent({
  setup() {
    const main = useMainStore();
    // call the action as a method of the store
    main.randomizeCounter();

    const user = useUsers();
    user.registerUser('user', 'password');

    return {};
  },
});
```

---

# Accessing other stores actions

To use another store, you can directly _use it_ inside of the _action_:

```ts
import { useAuthStore } from './auth-store';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences();
      } else {
        throw new Error('User must be authenticated');
      }
    },
  },
});
```

---

# Usage with `setup()`

You can directly call any action as a method of the store:

```ts
export default {
  setup() {
    const store = useStore();

    store.randomizeCounter();
  },
};
```

---

# Usage with the Options API: with `setup()`

```ts
import { useCounterStore } from '../stores/counterStore';

export default {
  setup() {
    const counterStore = useCounterStore();

    return { counterStore };
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment();
      console.log('New Count:', this.counterStore.count);
    },
  },
};
```

---

# without `setup()`

```ts
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
    // gives access to this.increment() inside the component
    // same as calling from store.increment()
    ...mapActions(useCounterStore, ['increment'])
    // same as above but registers it as this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```

---

# Summary

- Pinia is a store library for Vue, it allows you to share a state across components/pages
- Use store when data need to be accessed throughout your application or shared across components
- Store has three concepts:
  - `state` -> `data`
  - `getters` -> `computed`
  - `actions` -> `methods`

---

# Demo

https://github.com/gravitano/introduction-to-pinia
