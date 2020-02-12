const axios = require ('axios');
const login_url = 'https://api.nicecact.us/auth/login';
const login_email = 'contact@nba2kcontest.com'
const login_password = 'Atsiv09!'
var axios_headers = {
           'Accept-Encoding': 'gzip, deflate, br',
           'Content-Type': 'application/json',
           'Content-Length': '58',
           'Pragma': 'no-cache',}

const tournament_list_url = 'https://api.nicecact.us/matchmaking/tournament?populate_game=true&limit=10&page=1&sort_startDate=desc&no_description=true&no_rules=true&no_prizesInformation=true&$where=function()%20%7Bfor%20(let%20key%20in%20this.name)%20%7Bif%20(/proam/i.test(this.name%5Bkey%5D))%20%7Breturn%20true;%7D%7Dreturn%20false;%7D&game=5d765ff523ef1b11c02ceb07'

// fonction principale 
async function main() {

  login = async () => {
    try {
      const response  = await axios.post(
        login_url, 
        {email:login_email,password:login_password},
        {headers:axios_headers
          })
          return response.data.accessToken;
  } catch (error) {
    console.log(error)
  }
  }

  const accessToken = await login();
//console.log(accessToken)

// récupération de la liste des tournois
Tournament_List = async (token) => {
    try {
      const response = await axios.get(
        tournament_list_url, 
        {headers:{
           'x-access-token': token
          }})
        
          console.log(response.data.data.docs[0].name)
          console.log(response.data.data.docs[0].id)
          return response.data;
        // console.log(response.data.data[0].members)
  } catch (error) {
    console.log(error.message)
  }
  }
Tournament_List(accessToken);

//récupération de l'id d'une team
Team_id = async (token) => {
  try {
    const response = await axios.get(
      'https://api.nicecact.us/api/team?like_name=bayern&populate_game=true', 
      {headers:{
         'x-access-token': token
        }})
      
        console.log(response.data.data[0]._id)
        return response.data.data[0]._id;
      // console.log(response.data.data[0].members)
} catch (error) {
  console.log(error.message)
}
}

//Team_id (accessToken);
}

main ();
