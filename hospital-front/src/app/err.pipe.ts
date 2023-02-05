import { Pipe } from "@angular/core";

@Pipe({
    name: 'errChange' // 过滤器名
})
export class ErrorPipe{
    transform(val : any) : any{
        if(val.emptyId == true){
            return "Please select a patient";
        }else if(val.emptyContent == true){
            return "Please input the content";
        }else{
            return "Please input a correct time";
        }
    }
}