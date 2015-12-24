var socket = io();
var desksTableTemplate = _.template('<table class="pure-table serve-table"> <thead class="serve-table-head"> <tr> <th>Desk</th> <th>Token</th> </tr> </thead> <tbody> <% _(state.desks).each(function(val, key) { %> <tr> <td><%= key %></td> <td><%= val %></td> </tr> <% }); %> </tbody> </table>',
        { variable: 'state' });

socket.on('state', function(state) {
	updateDesks(state);
	updateToken(state.lastGivenToken);
});


socket.on('desks', function(state) {
	updateDesks(state);
});


socket.on('token', function(state) {
	updateToken(state.lastGivenToken);
	var lastGivenContainer = document.getElementsByClassName('info-box--last-given')[0];
	lastGivenContainer.classList.add('animated');
	setTimeout(function() {
		lastGivenContainer.classList.remove('animated');
	}, 5000)
});



var updateDesks = function(state) {
	var tableContainer = document.getElementsByClassName('js-table-container')[0];
    tableContainer.innerHTML = desksTableTemplate(state);
};

var updateToken = function(token) {
	var lastGiven = document.getElementsByClassName('js-last-given')[0];
    if(token !== 0) {
		lastGiven.textContent = token;
    } else {
		lastGiven.textContent = '';
    }
};

/**
 * Refresh weather iframe
 */
setInterval(function() {
	var iframe = document.getElementById('forecast_embed');
	iframe.src = iframe.src;
}, 1000 * 60 * 10); 
