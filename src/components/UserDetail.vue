<template>
  <div>
    <p>User Detail</p>
  <router-link tag="button" :to="{name: 'userEdit', params: {id: $route.params.id} }">Edit User</router-link>
  </div>
</template>

<script>
export default {
  name: "UserDetail"
}
</script>
