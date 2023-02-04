import { Pipe } from "@angular/core";

@Pipe({
    name: 'dateChange' // 过滤器名
})
export class DatePipe{
    transform(val : any) : any{
        const date = new Date(val);
        return date.toLocaleDateString();
    }
}