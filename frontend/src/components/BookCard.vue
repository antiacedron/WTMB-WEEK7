<script> 
export default {
  name: 'bookCard',
  props: ['data'] 
}
</script>

<template lang="pug"> 
div.wrapper
  div {{data._id}}
  div {{data.title}} 
  div.location {{data.location}}
</template> 

<style>
.wrapper {
  background-color: azure;
  padding: 20px;
  border: 1px solid;
  border-radius: 30px;
}

.location {
  color: #fff
}
</style>