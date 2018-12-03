import test from "ava";
import request from "supertest";
import app from "../app";

test("Index page should be rendered", async t => {
    const res = await request(app).get("/");

    t.is(res.status, 200);
    t.true(res.text.includes('hello there 👋'));
}); 


test("List of people view render", async t => {
    const personToCreate = { name: "Ororo Munroe Render", age: 43 };
  
    const creation = await request(app)
      .post("/person")
      .send(personToCreate);
  
    const res = await request(app).get("/person/all");
  
    t.is(res.status, 200);
    t.true(res.text.includes('Ororo Munroe Render'));
  }); 

  test("List of books view render", async t => {
    const bookToAdd = { 
        title: 'Pi',
        location: 'Berlin', 
    }; 

    const creation = await request(app)
      .post("/book")
      .send(bookToAdd); 

    const res = await request(app).get("/book/all"); 

    t.is(res.status, 200);
    t.true(res.text.includes('Pi',"Berlin")); 
  }); 

  test("Reader detail view render", async t => {
    const personToCreate = { name: "Ororo Munroe ", age: 43 };
  
    const createdPerson = (await request(app) 
      .post("/person")
      .send(personToCreate)).body;
  
    const res = await request(app).get(`/person/${createdPerson._id}`);
  
    t.is(res.status, 200);
    t.true(res.text.includes('Ororo Munroe')); 
  });
  
//   test("Book detail view render", async t => { 
//     const bookToAdd = { title: "Pi", location: "Berlin" }; 
  
//     const BookAdded = (await request(app)
//       .post("/book")
//       .send(bookToAdd)).body; 
    
//     const res = await request(app).get("/book/${BookAdded._id}");

//     t.is(res.status, 200); 
//     t.true(res,text.includes("Pi"));
// }) ; 

test("Book detail view render", async t => {
    const bookToAdd = { 
        title: 'Pi',
        location: 'Berlin',
        attendees: []
    }; 

    const BookAdded = (await request(app)
      .post("/book")
      .send(bookToAdd)).body; 

    const res = await request(app).get(`/book/${BookAdded._id}`);

    t.is(res.status, 200);
    t.true(res.text.includes('Pi')); 
  }); 