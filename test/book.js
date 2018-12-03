import test from "ava";
import request from "supertest";
import app from "../app"; 


//Add new book is actually included in Get list of Books so this test it is not really necesary

test("Add new book", async t => {
    //t.plan(3); 
    const bookToAdd = { title: "Pi", location: "Berlin" }; 
  
    const res = await request(app)
      .post("/book")
      .send(bookToAdd);  

  
    t.is(res.status, 200);
    t.is(res.body.title, bookToAdd.title);
    t.is(res.body.location, bookToAdd.location); 
  });   

  test("Get list of books", async t => {
    const bookToAdd = { title: "Pi", location: "Berlin"}; 
  
    const creation = await request(app)
      .post("/book")
      .send(bookToAdd); 
  
    const res = await request(app).get("/book/all"); 
  
    t.is(res.status, 200);
    t.true(Array.isArray(res.body), "Body should be an array");
    t.true(res.body.length > 0); 
  });
  
  test("Fetch a book", async t => {
    //t.plan(2); 
    const bookToAdd = { title: "Pi", location: "Berlin" }; 
  
    const piBookAdded = (await request(app)
      .post("/book")
      .send(bookToAdd)).body; 
  
    const fetchRes = await request(app).get(
      `/book/${piBookAdded._id}`
    ); 
  
    const piBookFetched = fetchRes.body; 
  
    t.is(fetchRes.status, 200); 
    t.deepEqual(piBookFetched, piBookAdded);
  }); 

  test ("Delete a book", async t => {
      
    const book = (await request (app)
       .post ("/book") 
       .send({ name:"Pi", location:"Madrid"})).body;  

    
    const del = await request(app).delete(`/book/${book._id}`);

    t.is(del.status, 200); 
    t.is(del.text, "ok"); 

    const fetch = await request(app).get(`/book/${book._id}/'json`);


       t.is(fetch.status, 404); 
    
  })  

  test('Person read a book', async t => { 
    const ororoReader = { name: 'Ororo Munroe', age: 43 }; 
  
    const bookPi = { title: 'Pi',
    location: 'Berlin',
    readers: []}; 
  
    const createdReader = (await request(app)
    .post("/person")
    .send(ororoReader)).body 
  
    const bookCreateRes = await request(app)
    .post("/book")
    .send(bookPi) 
  
    const createdBook = bookCreateRes.body 
  
    const addReadersRes = await request(app)
    .post(`/book/${createdBook._id}/add-reader`)
    .send( {personId : createdReader._id} ) 
  
    t.is(addReadersRes.status, 200) 
  
    const bookAltered = addReadersRes.body 
  
    t.is(bookAltered.readers[0]._id, createdReader._id)
  
    t.deepEqual(bookAltered.readers[0], createdReader)
  
    t.notDeepEqual(bookAltered, createdBook)
  }) 