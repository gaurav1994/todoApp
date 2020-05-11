export interface IResponsePayload {
     message : string,
     token : string,
     user : {
          email : string,
          username : string,
          _id : string
     },
     theme : string
}