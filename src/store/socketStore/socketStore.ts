import { makeAutoObservable, toJS } from 'mobx';
import io, { Socket } from 'socket.io-client';
import { Env } from '../../env';
import { AppRootStore } from '../store';
import { User } from '../../types/user';

class SocketStore {
    root: AppRootStore;

    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    _socket: typeof Socket | undefined;
    _connected = false;
    _keepAlive = false;
    _initialized = false;

    get socket() {
        return this._socket;
    }

    get connected() {
        return this._connected;
    }

    get keepAlive() {
        return this._keepAlive;
    }

    set keepAlive(value: boolean) {
        this._keepAlive = value;
    }

    connect = (user?: User) => {
        console.log('connecting...', toJS(this._socket));

        if (this._socket && !this._connected) {
            return this._socket?.open();
        }

        this._socket = io(Env.SocketUrl, {
            autoConnect: true,
            query: { userId: user?.id },
            transports: ['websocket'],
            reconnection: true,
            forceNew: true,
        });

        this._socket.on('connect', () => {
            this._connected = true;
            console.log('connected', this._socket);

            if (this._initialized) {
                return;
            }

            this._socket?.on('ping', () => {
                console.log('ping');
            });

            this._socket?.on('disconnect', () => {
                this._connected = false;
                console.log('disconnected', this._socket);
            });

            this._socket?.on('error', (error: any) => {
                console.log('error', error);
            });

            this.root.chatStore.init();
        });

        this._socket?.on('connect_error', (error: any) => {
            console.log('connect_error', error);
        });
    };

    disconnect = () => {
        if (this._socket) {
            this._socket.disconnect();
        } else {
            console.log('socket is null');
        }
    };

    dispose = () => {
        this._connected = false;
        this._keepAlive = false;
        this._initialized = false;

        this._socket?.removeAllListeners();

        this._socket = io();
    };
}

export default SocketStore;
