import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Stomp, StompConfig } from '@stomp/stompjs';

@Injectable({
    providedIn: 'root',
})
export class NewStompService {
    private connecting: boolean = false;
    private topicQueue: any[] = [];

    options = {
        timeout: 10000, // 设置超时时间为 10 秒
      };
    client = Stomp.client('http://44.211.141.255:8080/sba-websocket');
    subscribe(topic: string, callback?: any): void {
        // If stomp client is currently connecting add the topic to the queue
        this.client.connect({}, (): any => {
            this.subscribeToTopic(topic, callback);

            // Once we are connected loop the queue and subscribe to remaining topics from it
            this.topicQueue.forEach((item:any) => {
                this.subscribeToTopic(item.topic, item.callback);
            })

            // Once done empty the queue
            this.topicQueue = [];
        }),(error:any)=>{
            console.log(error);
        };
    }
    private subscribeToTopic(topic: string, callback?: any): void {
        this.client.subscribe(topic, (response?:any): any => {
            callback(response);
        });
    }
}