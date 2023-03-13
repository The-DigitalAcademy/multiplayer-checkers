import React from 'react';
import Checkers from './components/Checkers';
import Display from './components/Display';
import CenteredButton from './components/CenteredButton';

//connection
import io from 'socket.io-client';

let socket;
var connectionTries = 0;

const initialState = {
  step: "Welcome",
  connected: false,
}

var name = "";
var roomName = "";
var opponentName = "";
var isRoomHost = false;
var matchStarted = false;
var currentTurn = "P1";

var P1Rematch = false;
var P2Rematch = false;

const ENDPOINT = 'http://localhost:8080/';

class App extends React.Component {

  	state = initialState;

	handleChangeName = (e) => {
		name = e.target.value;
	}

	handleRoom = (e) => {
		roomName = e.target.value;
	}

	enteredName = () => {
		if(name === undefined || name === "") {
		name = names[Math.floor(Math.random() * names.length)]
		}

		socket = io(ENDPOINT);

		socket.on('reconnecting', () => {
			connectionTries++;
			if (connectionTries === 1) {
				this.setState({
					connectionError: "Unable to connect to server!"
				});
			}
		});

		socket.on('connect', () => {
			connectionTries = 0;
			this.setState({
				step: "Searching",
				connectionError: "",
			});
		});

		socket.emit('user-login', name);

		socket.on('user-created-room', this.createRoomSuccess);
		socket.on('creating-failed', this.createRoomFailed);

		socket.on('user-joined', this.joinRoomSuccess);
		socket.on('joining-failed', this.joinRoomFailed);

		socket.on('user-switch-turn', (receivedData) => {
			currentTurn = receivedData.turn;
			
			this.setState({
				currentTurn: currentTurn
			});
		});

		socket.on('user-left', () => {
			this.returnToMenu();
		})
	}

	requestJoinRoom = () => {
		if(this.validateRoomName() === false){
			this.setState({
				connectionError: "Please enter a valid room name",
			});
			return;
		}

		socket.emit('user-join-room', {
			name: name,
			roomName: roomName
		});
	}

	joinRoomSuccess = (enemy) => {
		opponentName = enemy;
		matchStarted = true;

		this.setState({
			step: "Playing",
			connectionError: "",
		})
	}

	joinRoomFailed = (reason) => {
		this.setState({
			connectionError: reason,
		});
	}

  	requestCreateRoom = () => {
		if(this.validateRoomName() === false){
			this.setState({
				connectionError: "Please enter a valid room name",
			});
			return;
		}

		socket.emit('user-create-room', roomName);
  	}

  	createRoomSuccess = (reason) => {
		isRoomHost = true;

		this.setState({
			step: "Playing",
			connectionError: "",
		});
	}

	createRoomFailed = (reason) => {
		this.setState({
			connectionError: reason,
		});
	}

	validateRoomName = () => {
		if(roomName === undefined || roomName === ""){
			return false;
		}

		return true;
	}

	flipTurn = () => {
		if(currentTurn === "P1") {
			currentTurn = "P2";
		} else{
			currentTurn = "P1"
		}

		this.setState({
			currentTurn: currentTurn,
		});
	}

	returnToMenu = () => {
		roomName = "";
		opponentName = "";
		isRoomHost = false;
		matchStarted = false;
		currentTurn = "P1";

		P1Rematch = false;
		P2Rematch = false;

		this.setState({
			step: "Searching",
			finished: false,
		})
	}

	retryClick = () => {
		socket.emit("retryClick", isRoomHost);
		if(isRoomHost) {
			P1Rematch = true;
		} else {
			P2Rematch = true;
		}
	}

	onRetryReceive = (otherIsHost) => { //not socket.on yet. also not made on server
		if(otherIsHost) {
			P2Rematch = true;
		} else {
			P1Rematch = true;
		}

		if(P1Rematch && P2Rematch) {
			socket.emit("restartGame");
	
		}
	}

  render() {
	var error;
    var UI = "";
    if(this.state.step === "Welcome") {
		if(this.state.connectionError !== undefined){
			error = <h4>{this.state.connectionError}</h4>
		}

		UI = [
			<div style={{marginTop: '10%'}}>
				{error}
				<input placeholder="Enter name..." onChange={ this.handleChangeName }></input>
				<CenteredButton callback={this.enteredName} text="Confirm name"></CenteredButton>
			</div>
		]
    } else if (this.state.step === "Searching") {
		if(this.state.connectionError !== undefined){
			error = <h4>{this.state.connectionError}</h4>
		}

		UI = [
			<h1>Welcome {name}</h1>,
			<div style={{marginTop: '7%'}}>
				{error}
				<input placeholder="Enter room name..." onChange={ this.handleRoom }></input>
				<div>
					<CenteredButton callback={this.requestCreateRoom} text="Create room"></CenteredButton>
					<CenteredButton callback={this.requestJoinRoom} text="Join room"></CenteredButton>
				</div>
			</div>
		]
    } else {

		var text = "Waiting for opponent  |  Room = " + roomName;
		if(opponentName !== "") {
			if((isRoomHost === true && currentTurn === "P1") || (isRoomHost === false && currentTurn === "P2")) {
				text = name + "'s turn!";
			}
			else {
				text = opponentName + "'s turn!";
			}
		}

		var Rematch = <h2 style={{paddingTop: "75%"}}>Rematch</h2>

		UI = [
		<div>
			<h2>{text}</h2>
			<div className="container">
				<div style={{float: "left"}}>
					<Display dir="left" text={ isRoomHost ? name : opponentName }></Display>
					{(this.props.finished === true && P1Rematch === true) ? Rematch : ""};
				</div>
				<div className="boardContainer">
					<Checkers 
					returnCallback={this.returnToMenu} 
					matchStarted={matchStarted} 
					player={isRoomHost ? "P1" : "P2"} 
					isHost={isRoomHost} name={name} 
					opponentName={opponentName} 
					socket={socket} 
					flipTurnCallback={this.flipTurn}
					retryCallback={this.retryClick}
					/>
				</div>
				<div style={{float: "right"}}>
					<Display dir="right" text={isRoomHost ? opponentName : name}></Display>
					{(this.state.finished === true && P2Rematch === true) ? Rematch : ""};
				</div>
			</div>
		</div>
      ]
    }

    return (
      <div className="App">
        <div className="Title">Checkers Online</div>
       {UI}
      </div>
    );
  }
}

export default App;

const names = [
		"nar",
		"An",
		"Alfr",
		"Alvi",
		"Ari",
		"Arinbjorn",
		"Arngeir",
		"Arngrim",
		"Arnfinn",
		"Asgeirr",
		"Askell",
		"Asvald",
		"Bard",
		"Baror",
		"Bersi",
		"Borkr",
		"Bjarni",
		"Bjorn",
		"Brand",
		"Brandr",
		"Cairn",
		"Canute",
		"Dar",
		"Einarr",
		"Eirik",
		"Egill",
		"Engli",
		"Eyvindr",
		"Erik",
		"Eyvind",
		"Finnr",
		"Floki",
		"Fromund",
		"Geirmundr",
		"Geirr",
		"Geri",
		"Gisli",
		"Gizzur",
		"Gjafvaldr",
		"Glumr",
		"Gorm",
		"Grmir",
		"Gunnarr",
		"Guomundr",
		"Hak",
		"Halbjorn",
		"Halfdan",
		"Hallvard",
		"Hamal",
		"Hamundr",
		"Harald",
		"Harek",
		"Hedinn",
		"Helgi",
		"Henrik",
		"Herbjorn",
		"Herjolfr",
		"Hildir",
		"Hogni",
		"Hrani",
		"Ivarr",
		"Hrolf",
		"Jimmy",
		"Jon",
		"Jorund",
		"Kalf",
		"Ketil",
		"Kheldar",
		"Klaengr",
		"Knut",
		"Kolbeinn",
		"Kolli",
		"Kollr",
		"Lambi",
		"Magnus",
		"Moldof",
		"Mursi",
		"Njall",
		"Oddr",
		"Olaf",
		"Orlyg",
		"Ormr",
		"Ornolf",
		"Osvald",
		"Ozurr",
		"Poror",
		"Prondir",
		"Ragi",
		"Ragnvald",
		"Refr",
		"Runolf",
		"Saemund",
		"Siegfried",
		"Sigmundr",
		"Sigurd",
		"Sigvat",
		"Skeggi",
		"Skomlr",
		"Slode",
		"Snorri",
		"Sokkolf",
		"Solvi",
		"Surt",
		"Sven",
		"Thangbrand",
		"Thjodoft",
		"Thorod",
		"Thorgest",
		"Thorvald",
		"Thrain",
		"Throst",
		"Torfi",
		"Torix",
		"Tryfing",
		"Ulf",
		"Valgaror",
		"Vali",
		"Vifil",
		"Vigfus",
		"Vika",
		"Waltheof"
	];