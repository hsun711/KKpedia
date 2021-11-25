import firebase from "./firebase";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
const doccategory = firebase.firestore().collection("categories");
const docuser = firebase.firestore().collection("users");
const docpost = firebase.firestore().collection("posts");

export const addToPlaceCollectBy = (title, location, userId) => {
	doccategory
		.doc(`${title}`)
		.collection("places")
		.doc(`${location}`)
		.update({
			collectedBy: firebase.firestore.FieldValue.arrayUnion(`${userId}`),
		})
		.then(() => {});
};

export const removePlaceCollectBy = (title, location, userId) => {
	doccategory
		.doc(`${title}`)
		.collection("places")
		.doc(`${location}`)
		.update({
			collectedBy: firebase.firestore.FieldValue.arrayRemove(`${userId}`),
		})
		.then(() => {});
};

export const addToUserLikes = (userId, location) => {
	docuser
		.doc(`${userId}`)
		.collection("likes")
		.doc(`${location[0].locationName}`)
		.set(location[0])
		.then(() => {
			Swal.fire({
				icon: "success",
				title: "收進口袋聖地囉",
				footer: '<a href="/profile/myCollection">前往口袋聖地</a>',
			});
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
};

export const removeUserLikes = (userId, location) => {
	docuser
		.doc(`${userId}`)
		.collection("likes")
		.doc(`${location}`)
		.delete()
		.then(() => {
			Swal.fire("移出口袋聖地囉");
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
};

export const getFollowedBy = (title, userId) => {
	return doccategory
		.where("title", "==", `${title}`)
		.where("followedBy", "array-contains", `${userId}`)
		.get();
};

export const addToUserFollow = (userId, title, data) => {
	docuser
		.doc(`${userId}`)
		.collection("follows")
		.doc(`${title}`)
		.set(data, { merge: true })
		.then(() => {
			Swal.fire("追蹤成功");
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
};

export const removeUserFollow = (userId, title) => {
	docuser
		.doc(`${userId}`)
		.collection("follows")
		.doc(`${title}`)
		.delete()
		.then(() => {
			Swal.fire("取消追蹤");
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
};

export const addToFollowedBy = (title, userId) => {
	doccategory
		.doc(`${title}`)
		.update({
			followedBy: firebase.firestore.FieldValue.arrayUnion(`${userId}`),
		})
		.then(() => {});
};

export const removeFollowedBy = (title, userId) => {
	doccategory
		.doc(`${title}`)
		.update({
			followedBy: firebase.firestore.FieldValue.arrayRemove(`${userId}`),
		})
		.then(() => {});
};

export const snapshotUserData = (userId, setFunc) => {
	return docuser.doc(`${userId}`).onSnapshot((doc) => {
		setFunc(doc.data());
	});
};

export const getUserData = (userId) => {
	return docuser.doc(`${userId}`).get();
};

export const getTopicData = (topic, setFunc) => {
	return doccategory.where("topic", "==", topic).onSnapshot((querySnapshot) => {
		const item = [];
		querySnapshot.forEach((doc) => {
			item.push(doc.data());
		});
		setFunc(item);
	});
};

export const getCategoriesTitle = (title, setFunc) => {
	doccategory
		.doc(`${title}`)
		.get()
		.then((doc) => {
			setFunc(doc.data());
		});
};

export const sendAlertToFollower = (
	user,
	docid,
	title,
	topic,
	locationName
) => {
	docuser
		.doc(`${user}`)
		.collection("news")
		.doc(docid)
		.set(
			{
				title: title,
				topic: topic,
				docid: docid,
				locationName: locationName,
			},
			{ merge: true }
		)
		.then(() => {});
};

export const getPhotos = (title, setFunc) => {
	return doccategory
		.doc(`${title}`)
		.collection("photos")
		.orderBy("postTime", "desc")
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
};

export const placeData = (title, setFunc) => {
	return doccategory
		.doc(`${title}`)
		.collection("places")
		.onSnapshot((snapshot) => {
			const placeDetail = [];
			snapshot.forEach((doc) => {
				placeDetail.push(doc.data());
			});
			setFunc(placeDetail);
		});
};

export const getPostDoc = (title, setFunc) => {
	return docpost
		.where("title", "==", `${title}`)
		.orderBy("postTime", "desc")
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				const data = {
					data: doc.data(),
					id: doc.id,
				};
				item.push(data);
			});
			setFunc(item);
		});
};

export const createPost = (data) => {
	docpost
		.doc()
		.set(data, { merge: true })
		.then((docRef) => {})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
};

export const updateUserImage = (docref, file, metadata, userId, area) => {
	const fileRef = firebase.storage().ref(docref);
	new Compressor(file, {
		quality: 0.8,
		success: (compressedResult) => {
			fileRef.put(compressedResult, metadata).then(() => {
				fileRef.getDownloadURL().then((imageUrl) => {
					docuser.doc(userId).update({
						[area]: `${imageUrl}`,
					});
				});
			});
			Swal.fire("更新成功");
		},
	});
};

export const editUserName = (userId, txt) => {
	docuser.doc(userId).update({
		userName: `${txt}`,
	});
};

export const getPostsData = (itemId, setFunc) => {
	return docpost
		.doc(`${itemId}`)
		.collection("comments")
		.orderBy("postTime", "desc")
		.onSnapshot((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setFunc(data);
		});
};

export const getPostLikedBy = (itemId, userId, setIcon, setFunc) => {
	return docpost.doc(`${itemId}`).onSnapshot((doc) => {
		if (doc.data()?.likedBy.includes(`${userId}`)) {
			setIcon(true);
		} else {
			setIcon(false);
		}
		setFunc(doc.data()?.likedBy.length);
	});
};

export const toggleGoodIcon = (state, itemId, userId) => {
	if (state === false) {
		docpost
			.doc(`${itemId}`)
			.update({
				likedBy: firebase.firestore.FieldValue.arrayRemove(`${userId}`),
			})
			.then(() => {});
	} else {
		docpost
			.doc(`${itemId}`)
			.update({
				likedBy: firebase.firestore.FieldValue.arrayUnion(`${userId}`),
			})
			.then(() => {});
	}
};

export const sendReplyComment = (itemId, data) => {
	docpost
		.doc(`${itemId}`)
		.collection("comments")
		.doc()
		.set(data, { merge: true })
		.then((docRef) => {})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
};

export const setPlaceReview = (title, data, setFunc) => {
	doccategory
		.doc(`${title}`)
		.collection("reviews")
		.doc()
		.set(data, { merge: true })
		.then(() => {
			Swal.fire("留言成功");
			setFunc(false);
		});
};
