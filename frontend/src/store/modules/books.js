import axios from 'axios';

const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_BOOK_SUCCESS = 'REQUEST_BOOK_SUCCESS';

const state = {
  data: [],
  book: {} 
};

const mutations = {
  [REQUEST_SUCCESS](state, data) {
    state.data = data;
  },
  [REQUEST_BOOK_SUCCESS](state, data) {
    state.book = data; 
  }
};

const actions = {
  async fetchBooks({ commit }) {
    const res = await axios.get('http://localhost:7000/book/all');
    commit(REQUEST_SUCCESS, res.data); 
  },
  async fetchBook({ commit }, id) {
    const res = await axios.get(`http://localhost:7000/book/${id}/json`);
    commit(REQUEST_BOOK_SUCCESS, res.data); 
  }
}; 

export default {
  state,
  mutations,
  actions,
}; 