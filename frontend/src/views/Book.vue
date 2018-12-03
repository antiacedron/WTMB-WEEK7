<script>
import { mapActions, mapState } from 'vuex'; 

export default {
  name: 'book',
  created() {
    this.fetchBook(this.$route.params.id)
  },
  computed: {
    ...mapState({
      book: state => state.books.book
    }),
  },
  methods: {
    ...mapActions(['fetchBook'])
  },
};
</script>

<template lang="pug">
div
  h2.title {{book.title}}
  div.location {{book.location}} 
</template>

<style>
.title {
  color:rgb(255,20,147);
}
.location {
  color:rgb (255,20,147); 
} 
</style>  