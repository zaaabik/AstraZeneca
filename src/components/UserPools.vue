<template>
  <div>
    User Name {{user.name}} Age {{user.age}}
  </div>
</template>

<script>

export default {
  name: "Pools",
  props: {
    id: String
  },
  data() {
    return {
      user: {
        name: "",
        age: 0
      }
    };
  },
  created() {
    try {
      this.user = JSON.parse(this.$cookie.get("users"))[this.id];
    } catch (e) {
      this.$router.push({
        path: "users"
      });
    }
  }
};
</script>
