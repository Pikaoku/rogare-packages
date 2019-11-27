"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("rxfire/firestore");
const helpers_1 = require("./helpers");
function FsCrudEndpoint({ db, endpoint, template, }) {
    const col = db.collection(endpoint);
    return {
        create: ({ data }) => col.add(Object.assign(Object.assign({}, template), data)).then(helpers_1.toDocRefId),
        destroy: ({ id }) => col.doc(id).delete(),
        update: ({ data, id }) => col.doc(id).update(data),
        read: ({ id }) => col
            .doc(id)
            .get()
            .then(helpers_1.toDocDataWith(template)),
    };
}
exports.FsCrudEndpoint = FsCrudEndpoint;
function FsListEndpoint({ db, endpoint, pageSize = 15, }) {
    const col = db.collection(endpoint).limit(pageSize);
    return {
        list: () => col.get().then(helpers_1.getDocsData),
        where: (where) => col
            .where(...where)
            .get()
            .then(helpers_1.getDocsData),
    };
}
exports.FsListEndpoint = FsListEndpoint;
function FsSteamEndpoint({ db, endpoint, pageSize: limit = 15, }) {
    const col = db.collection(endpoint).limit(limit);
    return {
        where: (where) => firestore_1.collectionData(col.where(...where), 'id'),
    };
}
exports.FsSteamEndpoint = FsSteamEndpoint;
function FsBasicEndpoint({ db, endpoint, template, }) {
    return Object.assign(Object.assign({}, FsCrudEndpoint({ db, endpoint, template })), FsListEndpoint({ db, endpoint }));
}
exports.FsBasicEndpoint = FsBasicEndpoint;
