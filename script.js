
var stompClient = null;

function sendMessage() {
	let jsonOb = {
		name:localStorage.getItem("name"),
		content:document.getElementById("message-value").value
	}

	stompClient.send("/app/message", {}, JSON.stringify(jsonOb));

}


function connect() {

	let socket = new SockJS("/server1");

	stompClient = Stomp.over(socket);

	stompClient.connect({}, function(frame) {

		console.log("connected :" + frame);

		document.getElementById("front").style.display = "none";
		document.getElementById("back").style.display = "block";

		stompClient.subscribe("/topic/return-to", function(response) {

			showMessage(JSON.parse(response.body));
		});

	})

}

function showMessage(message) {
	
 var table= document.getElementById("message-container-table");
  
      var row = document.createElement("tr");
      var cell = document.createElement("td");
		cell.textContent=message.name +" :"+message.content;
		row.appendChild(cell);
		table.prepend(row);
  
  
  }



window.addEventListener("load", function() {

	document.getElementById("login").addEventListener("click", function() {
		var name = document.getElementById("name-value").value;
		localStorage.setItem("name", name);
		connect();
		document.getElementById("welcome").innerHTML=localStorage.getItem("name");

	})


	document.getElementById("send").addEventListener("click", sendMessage);

}, false); 