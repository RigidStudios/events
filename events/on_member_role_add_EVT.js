module.exports = {
	name: "Member Role Added MOD",

	isEvent: true,

	fields: ["Temp Variable Name (stores role object):", "Temp Variable Name (stores member object):"],

	mod: function(DBM) {
		DBM.Mindlesscargo = DBM.Mindlesscargo || {};
		DBM.Mindlesscargo.roleAdded = async function(oldMember, newMember) {
			const { Bot, Actions } = DBM;
			const events = Bot.$evts["Member Role Added MOD"];
			if(!events) return;
			if (newMember.roles.size < oldMember.roles.size) return;

			for (const event of events) {
				const temp = {};
				const server = newMember.guild;
				const oldRoles = oldMember.roles;
				const newRoles = newMember.roles;

				let difference = newRoles.filter((role) => !oldRoles.has(role.id)).first();

				if (event.temp) temp[event.temp] = difference;
				if (event.temp2) temp[event.temp2] = newMember;

				Actions.invokeEvent(event, server, temp);
			}


		};

		const onReady = DBM.Bot.onReady;
		DBM.Bot.onReady = function(...params) {
			DBM.Bot.bot.on("guildMemberUpdate", DBM.Mindlesscargo.roleAdded);
			onReady.apply(this, ...params);
		};
	}
};
