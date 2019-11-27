type QuerySnapshort = firebase.firestore.QuerySnapshot
type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference

export const toDocRefId = (res: DocumentReference) => res.id

export const toDocData = (resp: DocumentSnapshot) => ({ ...resp.data() })

export const toDocDataWith = (data: any) => (snapshot: DocumentSnapshot) => ({
	...data,
	...snapshot.data(),
})

export const getDocsData = (querySnapshot: QuerySnapshort) =>
	querySnapshot.docs.map(toDocData)

export const getDocsDataWith = (data: any) => (snapshot: QuerySnapshort) =>
	snapshot.docs.map(toDocDataWith(data))
