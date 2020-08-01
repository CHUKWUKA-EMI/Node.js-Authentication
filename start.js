const app = require("./server");
const sequelize = require("./DB/connection");

const port = process.env.PORT || 8000;
app.listen(port, async function () {
	console.log(`Server listening on Port ${port}`);
	try {
		await sequelize.authenticate({ logging: false });
		console.log(`Database connected`);
	} catch (err) {
		console.log(err);
	}
});
