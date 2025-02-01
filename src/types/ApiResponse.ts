import {Message} from "@/model/user"


export interface ApiResponse {
  success:boolean;
  message:string;
  isAccessMessage?:boolean;
  messages?:Array<Message>
}