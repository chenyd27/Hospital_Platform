import { Pipe } from "@angular/core";

@Pipe({
    name: 'dateChange' // 过滤器名
})
export class DatePipe{
    transform(val : any) : any{
        const date = new Date(val.date);
        date.setDate(date.getDate() + val.deadline);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
}