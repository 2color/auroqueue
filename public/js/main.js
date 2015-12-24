var socket = io();
var desksTableTemplate = _.template('<table class="pure-table serve-table"> <thead class="serve-table-head"> <tr> <th>Desk</th> <th>Token</th> </tr> </thead> <tbody> <% _(state.desks).each(function(val, key) { %> <tr> <td><%= key %></td> <td><%= val %></td> </tr> <% }); %> </tbody> </table>',
        { variable: 'state' });


socket.on('state', function(state) {
	var tableContainer = document.getElementsByClassName('js-table-container')[0];
    tableContainer.innerHTML = desksTableTemplate(state);

    if(state.lastGivenToken !== 0) {
		var lastGiven = document.getElementsByClassName('js-last-given')[0];
		lastGiven.textContent = state.lastGivenToken;
    }
});


/**
 * Refresh weather iframe
 */
setInterval(function() {
	var iframe = document.getElementById('forecast_embed');
	iframe.src = iframe.src;
}, 1000 * 60 * 10); 
