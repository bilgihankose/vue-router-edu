<template>
<ul>
  <router-link to="/" tag="li"><a>Home</a></router-link>
  <router-link to="/user/1" tag="li"><a>User 1</a></router-link>
  <router-link to="/user/2" tag="li"><a>User 2</a></router-link>
</ul>
</template>

<script>
export default {
  name: "Header"
}
</script>
