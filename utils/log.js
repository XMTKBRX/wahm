const chalk = require('chalk');
module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.bold.hex("#FF0000").bold('[ Error ] » ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#FF0000").bold('[ Error ] »') + data);
     break;
		default:			        
      var job = ["#FFA500","#FFFF00","#00FF00","#0000FF", "#4B0082","#A020F0"];
    var random = 
job[Math.floor(Math.random() * job.length)]
                        console.log(chalk.bold.hex(random).bold(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {   
		case "success":
			console.log(chalk.bold.hex("#00FFFF").bold('[ KRS ] ❯ ') + data);
			break;
		case "warn":
			console.log(chalk.bold.hex("#0000A0").bold('[ KRS ] ❯ ') + data);
			break;
		case "error":
			console.log(chalk.bold.hex("#6C2DC7").bold('[ KRS ] ❯ ') + data);
			break;
		default:
      var job = ["#00FFFF","#800517","#5CB3FF","#737CA1", "#FFFC17","#00FF00"];
    var random = 
job[Math.floor(Math.random() * job.length)]
			console.log(chalk.bold.hex(random).bold(`[ KRS ] ❯ `) + data);
			break;
	}
	}