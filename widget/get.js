function $_GET(key) {
	var value = window.location.search.match(new RegExp('[?&]' + key + '=([^&#]*)'));
	return value && value[1];
}