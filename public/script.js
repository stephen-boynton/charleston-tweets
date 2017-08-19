var socket = io();
const tweeter = document.querySelector(".tweets");
const resArr = [];

socket.on("tweet", function(msg) {
	const div = document.createElement("div");
	div.className = "ind-tweet";
	div.innerHTML = `<div class="inner"><img src="${msg.user
		.profile_image_url_https}">
  <h3>${msg.user.name}</h3> <h4>@${msg.user.screen_name}</h4></div>
  <p>${msg.text}</p>`;
	console.log(msg);
	tweeter.insertBefore(div, tweeter.firstChild);
});
