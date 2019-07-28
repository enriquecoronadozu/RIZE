
var vueApp = new Vue({
  el: '#app',
  data: () => ({
    dialog: false,
   
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New robot' : 'Edit robot'
    }
  },

  
  methods: {
    initialize() {
     
    },

  }
})