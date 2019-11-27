"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDocRefId = (res) => res.id;
exports.toDocData = (resp) => (Object.assign({}, resp.data()));
exports.toDocDataWith = (data) => (snapshot) => (Object.assign(Object.assign({}, data), snapshot.data()));
exports.getDocsData = (querySnapshot) => querySnapshot.docs.map(exports.toDocData);
exports.getDocsDataWith = (data) => (snapshot) => snapshot.docs.map(exports.toDocDataWith(data));
