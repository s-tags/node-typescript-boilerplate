import { io } from 'socket.io-client';

type ICollection = 'trips' | 'drivers';

export const db = () => {
  let _collectionRef = '';
  let _socketRef: any;

  return {
    subscribe(collection: ICollection) {
      _collectionRef = collection;

      _socketRef = io(
        `${(globalThis as any).__biyahe_sdk__.socket}/${collection}`,
        {
          reconnectionDelayMax: 10000,
        },
      );

      return {
        id(id: string) {
          return {
            get(cb: (data: any) => any) {
              _socketRef.on(id, (data: any) => cb(data));
            },
          };
        },
      };
    },
    unsubscribe() {
      _socketRef?.removeAllListeners(_collectionRef);
    },
  };
};
