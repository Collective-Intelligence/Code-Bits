async function retrAcc(username, log=false) {
	var account;
	await steem.api.getAccounts([username], (err, result) => {
		if (err == null) {
			account = result[0];
		} else {
			console.log(err);
			account = false;
		}
	});

	return new Promise ((resolve, reject) => {
		setTimeout(function() {
			if (log) { console.log(account); }
			resolve(account);
		}, 2000);
	});
}

async function retrMemos(username, log=false) {
	var old_history, history = [];
	await steem.api.getAccountHistory(username, "-1", "100", (err, result) => {
		if (err == null) {
			old_history = result;
		} else {
			console.log(err);
			old_history = false;
		}

		if (old_history != false) {
			for (var i = 0; i < old_history.length; i++) {
				if (old_history[i][1]["op"][0] == "transfer") {
					try {
						history.push(JSON.parse(old_history[i][1]["op"][1]["memo"]));
					} catch(e) {
						//console.log(e);
					}
				}
			}
		} else {
			history = false;
		}
	});

	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			if (log) { console.log(history); }
			resolve(history);
		}, 2000);
	});
}