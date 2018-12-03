/* eslint-disable */

<script>
import { mapActions, mapState } from 'vuex';
import BookCard from '@/components/BookCard.vue' 

export default {
  name: 'books',
  created() {
    this.fetchBooks();
  },
  components: {
    BookCard
  },
  computed: {
    ...mapState({ 
      books: state => state.books.data,
    }),
  },
  methods: {
    ...mapActions(['fetchBooks']) 
  },
};
</script> 

<template lang="pug">
div
  h1 Hello!
  div(v-if="books.length")
    p Here are the books:
    div.books-list
        div.book(v-for="book in books")
        book-card(:data="book" key="book._id")
</template> 

<style>
.books-list {
  display: flex;
}

.book {
  margin: 30px;
}
</style>  