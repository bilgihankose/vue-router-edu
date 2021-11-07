<template>
<ul>
  <router-link to="/user/1" tag="li" exact><a>User 1</a></router-link>
  <router-link to="/user/2" tag="li" exact><a>User 2</a></router-link>
  <router-link to="/user/3" tag="li" exact><a>User 3</a></router-link>
  <router-link to="/user/4" tag="li" exact><a>User 4</a></router-link>
</ul>
</template>

<script>
export default {
  name: "UserStart"
}
</script>
