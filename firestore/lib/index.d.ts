import { CrudEndpoint, Endpoint, EndpointParams } from 'rogare';
declare type StringKeys = {
    [key: string]: any;
};
declare type FsParams<Model> = EndpointParams & {
    db: firebase.firestore.Firestore;
    template?: Model;
};
export declare function FsCrudEndpoint<Model>({ db, endpoint, template, }: FsParams<Model>): CrudEndpoint<Model>;
export declare function FsListEndpoint<Model extends StringKeys>({ db, endpoint, pageSize, }: FsParams<Model>): Endpoint;
export declare function FsSteamEndpoint<Model extends StringKeys>({ db, endpoint, pageSize: limit, }: FsParams<Model>): {
    where: (where: any) => any;
};
export declare function FsBasicEndpoint<Model extends StringKeys>({ db, endpoint, template, }: FsParams<Model>): Endpoint;
export {};
