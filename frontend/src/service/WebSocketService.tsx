import { Client, Frame, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8080/ws'; // Backend WebSocket endpoint

export class WebSocketService {
  private stompClient: Client | null = null; // Declare stompClient as Client type

  connect(onMessageReceived: (message: any) => void): void {
    const socket = new SockJS(SOCKET_URL); // Create a SockJS connection

    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket, // Use SockJS as WebSocket factory
      debug: (str) => console.log(str), // Optional: Log debug messages
      onConnect: () => {
        console.log('Connected to WebSocket');
        if (this.stompClient) {
          this.stompClient.subscribe('/topic/notification', (message: Message) => {
            onMessageReceived(JSON.parse(message.body));
          });
        }
      },
      onStompError: (frame: Frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    this.stompClient.activate(); // Connect to the WebSocket server
  }

  sendNotification(message: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendNotification',
        body: JSON.stringify({ message }),
      });
    } else {
      console.error('Cannot send message. Stomp client is not connected.');
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected from WebSocket');
      this.stompClient = null;
    }
  }
}

export default new WebSocketService();
