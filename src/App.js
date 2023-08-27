import 'bootstrap/dist/css/bootstrap.min.css';
import {ContainerProps, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import './App.css';


const CLIENT_ID="df97486d688142cda450952ab57515b1";
const CLIENT_SECRET="9ef3876537b94c5080c22b177a7b5b9a";
                                

function App() {
  const [searchInput, setSearchInput] = useState("");                                                                         ;
  const [accessToken, setAccessToken] = useState("");
  //seting up API calls
      useEffect(() =>{
          //API access token
          var authParameters={
            method:'POST',
            headers:{
              //spotify asks us to addthis line
              'Content-Type':'application/x-www-form-urlencoded'
            },
            // pass the parameters
            body:'grant_type=client_credentials&client_id='+ CLIENT_ID + '&client_secret=' + CLIENT_SECRET
          }
          fetch('https://api.spotify.com/v1/tracks', authParameters)
          .then(result=> result.json())
          .then(data => setAccessToken(data.access_token))
      }, [])

      //Search Artist Using REST - different fetch for async
      async function search(){
          console.log("Search for input string" +  searchInput);

          //Get request using Artist ID 24:00
          var artistParameters={
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer' + accessToken
            }
          }
var artistID = await fetch('https://api.spotify.com/v1/search?q='+ searchInput +'&type=album', artistParameters)
.then(response => response.json())
.then(data => console.log(data))
          //Get request with Artist ID to show all albums

          //Display

      }

  return (
    <div className="App">
    
      <header className="App-header">
        Spotify Music Search 
      </header>

      <container>
        <div className="mb-6" size="lg">
<InputGroup  className="mb-3" size="lg">
  <FormControl
  placeholder="Search For Artist"
  type="input"
  onKeyPress={event =>{
        if(event.key == "Enter"){
         search();
        }
  }
}
onChange={event => setSearchInput(event.target.value)}
  />
  <Button onClick={search}>
    Search Track
  </Button>
</InputGroup>
</div>
      </container>
      <container>
        <Row className="mx-2 row row-cols-4">
        
        <Card>
      <Card.Img src="#"/>
          <Card.Body>
          <Card.Title>
              Demo
          </Card.Title>
            </Card.Body>
        </Card>

        </Row>
      
       </container>
    </div>
  );
}

export default App;
