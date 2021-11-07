<template>
  <div>
    <p>User</p>
    <p>Yolladigin ID: {{ id }}</p>
    <button @click="navigateToHome()">Go to Home</button>
  </div>

</template>

<script>
export default {
  name: "User",
  data(){
    return {
      id: this.$route.params.id
    }
  },
  methods:{
    navigateToHome(){
      // this.$router.push("/")
      // this.$router.push({path: "/"})
      this.$router.push({ name: "home"})
    }
  }
}
</script>

<style scoped>

</style>