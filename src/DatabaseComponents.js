// IMPORTANT INFO FOR 'index.js'
const express = require('express')
const app = express()
const port = 3001

const entry_model = require('./entryModel')

app.use(express.json())
app.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control,Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  entry_model.getEntries()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/entries', (req, res) => {
  entry_model.newEntry(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch (error => {
    res.status(500).send(error);
  });
})

app.delete('/entries/:id', (req, res) => {
  entry_model.deleteEntry(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put("/entries/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  entry_model
    .updateEntry(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log('App running on port ${port}.')
})


// -------------------------------------------------------------------------------------------------- //

// IMPORTANT INFOR FOR 'app.js'
import { useState, useEffect } from 'react';



function App() {
  const [entries, setEntry] = useState(false);

  function getEntries() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setEntry(data);
      });
  }

  function newEntry(){
    let name = prompt('Enter author name');
    let title = prompt('Enter title of book');
    fetch('http://localhost:3001/entries', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({name, title}),
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      getEntries();
    });
  }

  function deleteEntry () {
    let id = prompt('Enter ISBN');
    fetch('http://localhost:3001/entries/${id}', {
      method: 'DELETE',
    })
      .then(response=> {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEntries();
      });
  }

  function updateEntry(){
    let id = prompt('Enter ISBN');
    let name = prompt('Enter author name');
    let title = prompt('Enter title of book');
    fetch('http://localhost:3001/entries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, title}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getEntries();
      });
    }

    useEffect(() => {
      getEntries();
    }, []);
    return (
      <div>
          {entries ? entries : 'There is no avaiable entry data'}
          <br />
          <button onClick={newEntry}> Add Entry. </button>
          <br />
          <button onClick={deleteEntry}> Delete Entrty </button>
          <br />
          <button onClick={updateEntry}> Update Entry</button>
      </div>
    );
}
export default App;

// -------------------------------------------------------------------------------------------------- //


// IMPORTANT INFO FOR 'entryModel.js'
const { Pool } = require('pg').Pool;         

const pool = new Pool({
   // user:         // username
   // host:           // connection to database
   // database:       // name of database on our server
   // password:       // password for database on our server
   // port:           //establish the port.
});

// Those credentials should ***ACTUALLY*** go into a ___.env file, included in the .gitignore folder.
// That is for security and safety of the information, as well as standard industry proceedure. 

// ------------------------------------------- //

// Function to get all entries
const getEntries = async() => {
    try {
        return await new Promise(function (resolve, reject){
            Pool.query(
                "SELECT * FROM __table__",
                (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results && results.rows) {
                        resolve(results.rows);
                    } else {
                        reject(new Error("No results found."));
                    }
                });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("internal server error. Sorry.");
    }
};

// Function to create new entries in database
const newEntry = (body) => {
    return new Promise(function(resolve, reject){
        const {name, title} = body;
        Pool.query(
            [name, title],
            (error, results) => {
            if (error){    
                reject.error;
            }
            if (results && results.rows) {
                resolve(
                    'A new entry has been added: %{JSON.stringify(results.rows[0])}'
                );} 
                else{
                    reject(new Error("No result found"));
                }
            })
    });
};

// Function to delete entries
const deleteEntry = (id) => {
    return new Promise(function(resolve, reject){
        Pool.query(
            "DELETE FROM __table__ WHERE id = $1",
            [id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve('Entry deleted with ID: ${id}')
            }
        );
    });
};

// Update table entry
const updateEntry = (id, body) =>{
    return new Promise(function (resolve, reject){
        const {name, title} = body;
        Pool.query(
            "UPDATE entry SET name = $1, title = $2 WHERE id = $3 RETURNING *",
            [name, title, id],
            (error, results) => {
                if (error){
                    reject(error);
                }
                if (results && results.rows){
                    resolve('Entry updated: ${JSON.stringify(results.rows[0])}');
                } 
                else {
                    reject(new Error("No result found."));
                }
            }
        );
    });
};

module.exports = {
    getEntries,
    newEntry,
    deleteEntry,
    updateEntry
};