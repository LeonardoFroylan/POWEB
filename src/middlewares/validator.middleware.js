export const validateSchema = (schema)=>(req,res,next)=>{
    try{
        schema.parse(req.body);
        next();
    } catch (error){
        //creamos un objeto para mapear los errores
        // const errorMessages = {};
        // error.issues.forEach((issue => {
        //     const field = issue.path[0];
        //     const message = issue.message;
        //     errorMessages[field] = message;
        // }));
        return res.status(400).json(error.issues.map((issue)=> issue.message));
    }
}