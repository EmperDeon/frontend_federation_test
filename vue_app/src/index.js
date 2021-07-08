import Vue from "vue";

function app_callback(root) {
  root.innerHTML = `
    <p>
      Vue
      Count - {{count}}
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </p>
  `

  new Vue({
    el: root,
    data: {
      count: 0
    },
    methods: {
      increment () {
        this.count += 1;
      },
      decrement () {
        this.count -= 1;
      }
    }
  })
}

export default app_callback;
