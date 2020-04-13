const express = require('express');
const server = express();
const db = require('./db');

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');
nunjucks.configure("views", {
  express: server,
  noCache: true,
});

server.get("/", function(request, response){

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados. Tente novamente.");
    }

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    lastIdeas = lastIdeas.reverse();

    return response.render("index.html", { ideas: lastIdeas });
  });

  
});

server.post("/", function(request, response) {
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?, ?, ?, ?, ?);
  `;

  const image = request.body.image;
  const title = request.body.title;
  const category = request.body.category;
  const description = request.body.description;
  const link = request.body.link;

  const values = [
      image,
      title,
      category,
      description,
      link,
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados. Tente novamente.");
    }

    return response.redirect("/ideias");
  });
});

server.get("/ideias", function(request, response){

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados. Tente novamente.");
    }

    const reverseIdeas = [...rows].reverse();

    return response.render("ideias.html", { ideas: reverseIdeas });
  });
});

server.get("/delete/:id", function(request, response) {

  const id = request.params.id;

  db.run(`DELETE FROM ideas WHERE id = ?`, id, function(err) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados. Tente novamente.");
    }

    return response.redirect("/ideias");
  });
});

server.listen(3000);