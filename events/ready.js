const client = require('..')
const chalk = require('chalk')

client.on("ready", () => {
	const activities = [
		{ name: `Sicario`, type: 0 } // PLAYING
	];

	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 4000);
	
	client.user.setStatus("online")
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});
