export declare const toDocRefId: (res: import("firebase").firestore.DocumentReference) => string;
export declare const toDocData: (resp: import("firebase").firestore.DocumentSnapshot) => {};
export declare const toDocDataWith: (data: any) => (snapshot: import("firebase").firestore.DocumentSnapshot) => any;
export declare const getDocsData: (querySnapshot: import("firebase").firestore.QuerySnapshot) => {}[];
export declare const getDocsDataWith: (data: any) => (snapshot: import("firebase").firestore.QuerySnapshot) => any[];
