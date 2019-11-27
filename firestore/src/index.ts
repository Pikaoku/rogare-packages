import { Base } from 'rogare'
import { collectionData } from 'rxfire/firestore'
import { getDocsData, toDocDataWith, toDocRefId } from './helpers'

type StringKeys = { [key: string]: any }

type FsParams<Model> = EndpointParams & {
	db: firebase.firestore.Firestore
	template?: Model
}

export function FsCrudEndpoint<Model>({
	db,
	endpoint,
	template,
}: FsParams<Model>): CrudEndpoint<Model> {
	const col = db.collection(endpoint)
	return {
		create: ({ data }) =>
			col.add({ ...template, ...data }).then(toDocRefId),
		destroy: ({ id }) => col.doc(id).delete(),
		update: ({ data, id }) => col.doc(id).update(data),
		read: ({ id }) =>
			col
				.doc(id)
				.get()
				.then(toDocDataWith(template)),
	}
}

// TODO: Abstract out firestore's where structure
export function FsListEndpoint<Model extends StringKeys>({
	db,
	endpoint,
	pageSize = 15,
}: FsParams<Model>): Endpoint {
	const col = db.collection(endpoint).limit(pageSize)
	return {
		list: () => col.get().then(getDocsData),
		where: (where: FsWhere<Model>) =>
			col
				.where(...where)
				.get()
				.then(getDocsData),
	}
}

export function FsSteamEndpoint<Model extends StringKeys>({
	db,
	endpoint,
	pageSize: limit = 15,
}: FsParams<Model>) {
	const col = db.collection(endpoint).limit(limit)
	return {
		where: (where: FsWhere<Model>) =>
			collectionData(col.where(...where), 'id'),
	}
}

export function FsBasicEndpoint<Model extends StringKeys>({
	db,
	endpoint,
	template,
}: FsParams<Model>): Endpoint {
	return {
		...FsCrudEndpoint({ db, endpoint, template }),
		...FsListEndpoint({ db, endpoint }),
	}
}
