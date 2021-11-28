import firebase from "./firebase";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
const doccategory = firebase.firestore().collection("categories");
const docuser = firebase.firestore().collection("users");
const docpost = firebase.firestore().collection("posts");

///////// User Area ////////////
export const creatUser = (email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const setUserData = (userId, data) => {
	docuser
		.doc(`${userId}`)
		.set(data, { merge: true })
		.then((docRef) => {
			Swal.fire("註冊成功");
		});
};

export const signinUser = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const popupSignin = (provider) => {
	return firebase.auth().signInWithPopup(provider);
};

export const getUserData = (userId) => {
	return docuser.doc(`${userId}`).get();
};

export const snapshotUserData = (userId, setFunc) => {
	return docuser.doc(`${userId}`).onSnapshot((doc) => {
		setFunc(doc.data());
	});
};

export const editUserName = (userId, txt) => {
	docuser.doc(userId).update({
		userName: `${txt}`,
	});
};

export const levelUpUser = (userId, userLevel, num) => {
	docuser.doc(`${userId}`).update({
		userLevel: Number(userLevel) + Number(num),
	});
};

export const getUserContribution = (userId, setFunc) => {
	// collectionGroup 可以跳過第一個 collection 直接到第二個 collection 去篩選指定的東西
	// 就不用在第一個 collection 裡的 doc 裡一個一個篩選
	return firebase
		.firestore()
		.collectionGroup("places")
		.where("uid", "==", `${userId}`)
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
};

export const snapshotUserCollectPlace = (userId, setFunc) => {
	return docuser
		.doc(`${userId}`)
		.collection("likes")
		.onSnapshot((snapshot) => {
			const item = [];
			snapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
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

export const getUserFollow = (userId, setFunc) => {
	return docuser
		.doc(`${userId}`)
		.collection("follows")
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
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

export const getUserPost = (userId, setFunc) => {
	return docpost
		.where("userId", "==", `${userId}`)
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

export const removeUserPost = (docId) => {
	docpost
		.doc(`${docId}`)
		.delete()
		.then(() => {
			Swal.fire("刪除成功!", "被刪除了留言已回不來了", "success");
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
};

export const snapshotUserNews = (userId, setLength, setFunc) => {
	return docuser
		.doc(`${userId}`)
		.collection("news")
		.onSnapshot((querySnapshot) => {
			setLength(querySnapshot.docs.length);
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
};

export const deleteUserNews = (userId, docid, topic, title, locationName) => {
	docuser
		.doc(`${userId}`)
		.collection("news")
		.doc(`${docid}`)
		.delete()
		.then(() => {
			window.location.replace(`/${topic}/${title}/${locationName}`);
		});
};

///////// Place Area ////////////
export const getPlaceData = (title, setFunc) => {
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

export const snapshotTitlePlace = (title, setFunc, setNotFound) => {
	return doccategory
		.where("title", "==", `${title}`)
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			if (item.length > 0) {
				setFunc(item);
				setNotFound(false);
			} else {
				setNotFound(true);
			}
		});
};

export const getPlaceName = (title, locationName) => {
	return doccategory
		.doc(`${title}`)
		.collection("places")
		.doc(`${locationName}`)
		.get();
};

export const snapshopEachPlace = (
	title,
	location,
	setPlaceData,
	setEditText,
	setPosterName
) => {
	return doccategory
		.doc(`${title}`)
		.collection("places")
		.where("locationName", "==", `${location}`)
		.onSnapshot((querySnapshot) => {
			if (querySnapshot.docs.length > 0) {
				querySnapshot.forEach((doc) => {
					setPlaceData([doc.data()]);
					setEditText(doc.data().description);
					getUserData(doc.data().uid).then((doc) => {
						setPosterName(doc.data().userName);
					});
				});
			} else {
				setPlaceData([]);
			}
		});
};

export const editPlaceDescription = (
	collectionName,
	docName,
	subCollection,
	location,
	editText
) => {
	firebase
		.firestore()
		.collection(`${collectionName}`)
		.doc(`${docName}`)
		.collection(`${subCollection}`)
		.doc(`${location}`)
		.update({
			description: `${editText}`,
		});
};

export const getPlaceCollectBy = (title, location, userId) => {
	return doccategory
		.doc(`${title}`)
		.collection("places")
		.where("locationName", "==", `${location}`)
		.where("collectedBy", "array-contains", `${userId}`)
		.get();
};

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

export const getAllReviews = (title, location, setFunc) => {
	return doccategory
		.doc(`${title}`)
		.collection("reviews")
		.where("locationName", "==", `${location}`)
		.orderBy("timestamp", "desc") // desc 遞減 | asc 遞增
		.onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setFunc(item);
		});
};

export const setPlaceReview = (title, data, setFunc) => {
	const docid = doccategory.doc(`${title}`).collection("reviews").doc().id;
	const finalData = { ...data, docid: docid };
	doccategory
		.doc(`${title}`)
		.collection("reviews")
		.doc(docid)
		.set(finalData, { merge: true })
		.then(() => {
			Swal.fire("留言成功");
			setFunc(false);
		});
};

///////// 3 Topic & Each Title Area ////////////
export const getTopicData = (topic, setFunc) => {
	return doccategory.where("topic", "==", topic).onSnapshot((querySnapshot) => {
		const item = [];
		querySnapshot.forEach((doc) => {
			item.push(doc.data());
		});
		setFunc(item);
	});
};

export const getFollowedBy = (title, userId) => {
	return doccategory
		.where("title", "==", `${title}`)
		.where("followedBy", "array-contains", `${userId}`)
		.get();
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

export const sendAlertToFollower = (user, data) => {
	const docid = docuser.doc(`${user}`).collection("news").doc().id;
	const finalData = { ...data, docid: docid };

	docuser
		.doc(`${user}`)
		.collection("news")
		.doc(docid)
		.set(finalData, { merge: true })
		.then(() => {});
};

export const getCategoriesTitleData = (title) => {
	return doccategory.doc(`${title}`).get();
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

export const addPhotos = (title, subcollection, docid, data, func) => {
	doccategory
		.doc(`${title}`)
		.collection(`${subcollection}`)
		.doc(`${docid}`)
		.set(data, { merge: true })
		.then((docRef) => {
			func();
		});
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

export const updateSingleImage = (
	docref,
	file,
	metadata,
	collectionName,
	docId,
	area
) => {
	const fileRef = firebase.storage().ref(docref);
	new Compressor(file, {
		quality: 0.8,
		success: (compressedResult) => {
			fileRef.put(compressedResult, metadata).then(() => {
				fileRef.getDownloadURL().then((imageUrl) => {
					firebase
						.firestore()
						.collection(`${collectionName}`)
						.doc(docId)
						.update({
							[area]: `${imageUrl}`,
						});
				});
			});
			Swal.fire("更新成功");
		},
	});
};

export const putImageToStorage = (docRef, file) => {
	return firebase.storage().ref(docRef).put(file);
};

export const getImageURL = (docRef, childId, title, subCollection, docId) => {
	firebase
		.storage()
		.ref(docRef)
		.child(`${childId}`)
		.getDownloadURL()
		.then((imgUrls) => {
			doccategory
				.doc(`${title}`)
				.collection(`${subCollection}`)
				.doc(`${docId}`)
				.update({
					images: firebase.firestore.FieldValue.arrayUnion(`${imgUrls}`),
				});
		});
};

export const uploadStarImages = (title, subCollection, data) => {
	const docid = doccategory.doc(`${title}`).collection("photos").doc().id;

	doccategory
		.doc(`${title}`)
		.collection(`${subCollection}`)
		.doc(`${docid}`)
		.set(data, { merge: true });
};

export const updateSnsURL = (title, sns, text) => {
	doccategory.doc(`${title}`).update({
		[sns]: `${text}`,
	});
};

export const getCalenderEvent = (title, setFunc) => {
	return doccategory
		.doc(`${title}`)
		.collection("calenders")
		.onSnapshot((snapshot) => {
			const enevtDetail = [];
			snapshot.forEach((doc) => {
				enevtDetail.push(doc.data());
			});
			setFunc(enevtDetail);
		});
};

export const setCalenderEvent = (title, data) => {
	return doccategory
		.doc(`${title}`)
		.collection("calenders")
		.doc()
		.set(data, { merge: true });
};

export const removeCalenderEvent = (title, eventTitle, eventDate) => {
	return doccategory
		.doc(`${title}`)
		.collection("calenders")
		.where("title", "==", `${eventTitle}`)
		.where("date", "==", `${eventDate}`)
		.get();
};
