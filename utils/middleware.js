export const auth = (req, res, next) => {
    let session = req.session;
    if (session.profile) {
		return next();
	} else {
		return res.redirect("/auth-login");
    }
};
