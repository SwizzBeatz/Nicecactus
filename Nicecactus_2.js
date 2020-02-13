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

// fonction login pour récupérer l'access token
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

// récupération  de la liste des tournois avec le terme "proam"
Tournament_List = async (token) => {
    try {
      const tournament_list_response = await axios.get(tournament_list_url, {headers:{'x-access-token': token}})
      let tournamentlist = tournament_list_response.data.data.docs;
      let tournaments_list_results =[];
      let participant_list_results =[];
      // console.log(tournament_list_response.data.data.docs)
      for (var tournament of tournamentlist) {     
        const tournament_id = tournament.id;
        const tournament_name = tournament.name;
        const participants_list_url= 'https://api.nicecact.us/matchmaking/tournament/'+tournament_id+'/participants';
        //console.log (participants_list_url);
        // console.log (tournament_id);
        //console.log (tournament_name);
        let tournament_info = {
          TournamentID: tournament_id,
          TournamentName: tournament_name,
          url: participants_list_url
        }
        let ParticipantsUrl = {
          url: participants_list_url
        } 
        participant_list_results.push(ParticipantsUrl);
        tournaments_list_results.push(tournament_info);
        // console.log (participants_list_response.data.data[0].name);
      }
      console.log(tournaments_list_results);
      return tournaments_list_results;
        // return response.data.data;
        } catch (error) {
    console.log(error.message)
  }
  }
await Tournament_List(accessToken);


// récupération  de la liste des participants des tournois 
Participant_List = async (url, token) => {
  try {
    const participants_list_response = await axios.get(url, {headers:{'x-access-token': token}})
    let participants_list = participants_list_response.data.data;
    //console.log (participants_list);
    let participant_list_results =[];
    // console.log(tournament_list_response.data.data.docs)
    for (var participant of participants_list) {     
      const participant_id = participant.id;
      const participant_name = participant.name;
      console.log (participant_id);
      console.log (participant_name);
      // console.log (participants_list_response.data.data[0].name);
    }
      // return response.data.data;
      } catch (error) {
  console.log(error.message)
  }
  }
  await Participant_List('https://api.nicecact.us/matchmaking/tournament/5e386b8e49b3c79ecf15a32c/participants',accessToken);
}




main ();
