export const response = (res, result, status, message, pagination) => {
    const resultPrint = {};
    resultPrint.status = "success";
    resultPrint.statusCode = status;
    resultPrint.data = result;
    resultPrint.message = message || null;
    resultPrint.pagination = pagination || null;
    res.status(status).json(resultPrint);
};

export const auth = (req, res, next) => {
    let user = req.session.profile;
    console.log(user);
    if (user) {
        return next();
    } else {
        return res.redirect("/auth-login");
    }
};
