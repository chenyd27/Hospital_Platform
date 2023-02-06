import { Pipe } from "@angular/core";

@Pipe({
    name: 'priorityChange' // 过滤器名
})
export class PriorityPipe{
    transform(val : any) : any{
        if(val == 1){
            return "LOW";
        }else if(val == 2){
            return "MIDDLE";
        }else{
            return "HIGH";
        }
    }
}