

class ApiError extends Error{

    statusCode: number;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message: string= "Something went wrong (default api error message from apiError class)",
        errors: any[]= [],
        stack: string= ""
    ){
        super(message)
        this.statusCode= statusCode
        this.message= message
        this.data= null
        this.success= false
        this.errors= errors
        Error.captureStackTrace(this, this.constructor)

        if(stack.length !== 0){
            this.stack= stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
        
    }
}

export {ApiError}