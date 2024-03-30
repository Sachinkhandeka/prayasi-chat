module.exports.wrapAsync  = (fn)=> {
    return  (req , res , next)=> {
        fn(res , res, next).catch(err => next(err))
    }
}
 