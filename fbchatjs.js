var login = require("facebook-chat-api");
const fs = require("fs");
var cleverbot = require('cleverbot.io');
var jsonfile = require('jsonfile');
var extend = require('util')._extend;


var bot = new cleverbot('TYHRwNcZFicTF4xI','rKarZL4vSevwLDnjLXnGK7MRkBwud1W1');
bot.setNick("clayton");


login({email: "clayytonbhig@gmail.com", password: "naisubhig"}, function callback (err, api) {
    if(err) return console.error(err);

    api.setOptions({
      selfListen: true,
      logLevel: "silent"
    });

    var group = '1144974435591141'; //test chat pls ignore
    api.sendMessage("Enter B H I G", group);
    var roon = '100000921889753'; //roon's user ID
	var tracking_data = {};
	var thread_info = {};
	var deeb = '100003952090241'; //aaron's user ID
	var file_exists = true;
	try {
		tracking_data = jsonfile.readFileSync('tracking_data.json');
	} catch(err) {
		file_exists = false;
	}
	console.log(typeof big_data);

    api.getThreadInfo(group, function(err, info) {
    	if (err) return console.error(err);
    	thread_info = info;
    	console.log("Here is info, \n", thread_info);
    	console.log("here is the participantIDs variable \n", info.participantIDs);
    	if (!file_exists) {
	    	for (var x in thread_info.participantIDs) {
	    		var y = thread_info.participantIDs[x];
	    		tracking_data[y] = 0;
	    	}
    	}

	    console.log("tracking_data: ");
	    var str = JSON.stringify(tracking_data, null, 4); // (Optional) beautiful indented output.
		console.log(str);

	    var stopListening = api.listen(function(err, event) {
	        if (err) return console.error(err);
	        console.log(event);
	        if (event.threadID == group) {
	        	switch(event.type) {
	        		case "message":
	            		const input = event.body;
	            		if (input) {
	            			if(input === '/stopthemadness') {
		        				api.sendMessage("fuk the frik off", group);
		        				var file = 'tracking_data.json'
								 
								jsonfile.writeFile(file, tracking_data, function (err) {
									if (err) console.error(err);
								})
		        				return stopListening();
		        			}
		        			if(input === '/status') {
		        				api.getThreadInfo(group, function(err, info) {
		        					if (err) return console.error(err);
			        				thread_info = info;
						        	var output = extend({}, tracking_data);
						        	console.log(thread_info.nicknames);
						        	for (var x in thread_info.nicknames) {
						        		if (x in output) {
						        			output[thread_info.nicknames[x]] = output[x];
											delete output[x];
						        		}
						        	}
						        	api.sendMessage(JSON.stringify(output, null, 4), group);	        					
		        				});
					        }
					        if(input === '/statustest') {
					        	api.sendMessage(JSON.stringify(tracking_data, null, 4), group);	
					        }	
		        			if(input === '/kukup') {
		        				api.sendMessage("HO HO HO", group);
		        				api.changeNickname("Bhuge Dumbass", group, deeb);
		        			}
		        			if(input === '/dab') {
		        				api.sendMessage({attachment: fs.createReadStream('dab.png')}, group);
		        			}
		        			if(input === '/gloriousdawn') {
		        				api.sendMessage("HO HO HO", group);
		        					api.changeGroupImage(fs.createReadStream("dab.png"), group, function callback(err) {
				        				if(err) return console.error(err);
				    			});
		        			}
		        			/*if(input === '/surendrekt') {
		        				api.sendMessage("Surendrekt", group);
		        				api.removeUserFromGroup(roon, group, function callback(err){
				        			if(err) return console.error(err);
				    			});
				    			setTimeout(api.addUserToGroup(roon, group, function callback(err){
				    				if (err) return console.error(err);
				    			}), 5000);
		        			}
		        			if(input === '/surendrestored') {
		        				api.sendMessage("May the dew be with you", roon);
		        				api.addUserToGroup(roon, group, function callback(err){
				    				if (err) return console.error(err);
				    			});
		        			}*/
		        			if (input.indexOf("/8ball")==0 || input.indexOf("🎱")==0) {
	                			var eightball = 
	                			[
	                			"It is certain",
	                			"It is decidedly so",
	                			"Without a doubt", 
	                			"Yes, definitely",
	                			"Yes, definitely",
	                			"You may rely on it",
	                    		"As I see it, yes",
	                    		"Most likely",
	                    		"Outlook good",
	                    		"Yes",
	                    		"Signs point to yes",
	                    		"Reply hazy try again",
	                    		"Ask again later",
	                    		"Better not tell you now",
	                    		"Cannot predict now",
	                    		"Concentrate and ask again",
	                    		"Don't count on it",
	                    		"My reply is no",
	                    		"My sources say no",
	                    		"Outlook not so good",
	                    		"Very doubtful"];

		               			api.sendMessage(eightball[Math.floor(Math.random()*20)], group);
	            			}
	            			if(input.indexOf("/talk")==0){
								var talking = input.replace("/talk ","");
								bot.create(function(err,Clayton){
									bot.ask(talking,function(err,response){
										api.sendMessage(response,group);
									})
								})
							}
	            		}

	        			if (event.senderID) {
					        tracking_data[event.senderID]++;
					        str = JSON.stringify(tracking_data, null, 4);
							console.log(str);		        	
				        }

		        	break;

		        case "read_receipt":
		        	if (Math.random() > .99 && event.reader == roon)
		        		api.sendMessage("Well, Tarnum?",group);
		        	break;
		    	}
	        }
	    });
	});
});
