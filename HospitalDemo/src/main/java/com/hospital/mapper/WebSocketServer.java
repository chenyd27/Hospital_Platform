package com.hospital.mapper;


import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * WebSocketServer：相当于ws协议的controller
 */

//这个地址类似我们requestMapping，前端可以通过这个地址进行访问
@ServerEndpoint("/imserver")
@Component
public class WebSocketServer {

    //日志
    private final static Logger log = LoggerFactory.getLogger(WebSocketServer.class);
    /**静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。*/
    private static int onlineCount = 0;

    /**concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。*/
    //新建一个ConcurrentHashMap webSocketMap 用于接收当前userId的WebSocket，方便IM之间对userId进行推送消息。
    private static ConcurrentHashMap<String,WebSocketServer> webSocketMap = new ConcurrentHashMap<>();
    /**与某个客户端的连接会话，需要通过它来给客户端发送数据*/
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();

    private Session session;
    //    /**接收userId*/
    private String userId="";

    //这个temp主要是用来处理mq发送数据的一些问题,后面我会贴上代码，可以看一下
    public static Session temp;

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) {
        this.session = session;
        webSocketSet.add(this);
        System.out.println("happy");
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        System.out.println("close");
    }


    /**
     * 收到客户端消息后调用的方法
     *@OnMessage可以用来接到客户端的信息之后的处理，可以在自己的方法上添加@OnMessage
     * @param message 客户端发送过来的消息*/

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("hallo");
        System.out.println(message);
    }

    /**
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {

    }
    /**
     * 实现服务器主动推送：主要是这个方法，拿到session之后发送想要的消息给前端
     */
    public void sendMessage(String message) throws IOException {
        System.out.println(this.session);
        this.session.getBasicRemote().sendText(message);
    }
    public static void sendInfo(String message) throws IOException {
        for (WebSocketServer item : webSocketSet) {
            try {
                item.sendMessage(message);
            } catch (IOException e) {
                continue;
            }
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }
    public void setSession(Session session) {
        this.session = session;
    }


}



