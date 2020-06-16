
var AppVue = new Vue({
  el: '#app',
  data() {

    return {
      robot_ip: "",
      dialog_send: false,
      dialog_pepper: false,
      dialog_start: false,
    }
  },

  created() {

    window.addEventListener('resize', this.handleResize)
  },



  methods: {



  },
})

