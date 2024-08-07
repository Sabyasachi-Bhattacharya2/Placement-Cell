export function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/employee/login');
}