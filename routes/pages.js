const bcrypt = require("bcryptjs");
const mailer = require("./../services/sendgridMail");
const db = require("../DB/database");

module.exports = function (app, passport) {
	app.get("/register", (req, res) => {
		res.render("register", { message: req.flash("regMsg") });
	});
	app.post("/register", async (req, res) => {
		const { firstname, lastname, username, password, email } = req.body;
		try {
			const existingUser = await db.Users.findOne({ where: { email: email } });
			if (existingUser) {
				throw new Error("User already exists");
			}
			const pass_hash = bcrypt.hashSync(password, 10);
			await db.Users.create({
				firstname: firstname,
				lastname: lastname,
				username: username,
				password: pass_hash,
				email: email,
			});
			await mailer.sendEmail(
				`Developer-Justice <pistischaris494@gmail.com>`,
				email,
				`Email Confirmation`,
				`Hi ${firstname} ${lastname},<br>
                Thank you for registering with us.`
			);
			res.redirect(302, "/login");
		} catch (err) {
			return err.message;
		}
	});

	app.get("/login", (req, res) => {
		res.render("login", { message: req.flash("loginMsg") });
	});

	app.post(
		"/login",
		passport.authenticate("local-login", {
			successRedirect: "/profile",
			failureRedirect: "/login",
			failureFlash: true,
		})
	);

	app.get("/logout", (req, res) => {
		req.logOut();
		res.redirect("/login");
	});

	app.get("/profile", isLoggedIn, (req, res) => {
		res.render("profile", {
			user: req.user,
		});
	});
};
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
}
