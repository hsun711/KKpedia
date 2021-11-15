import firebase from "firebase";
import Swal from "sweetalert2";

const socialMediaAuth = (provider) => {
	const db = firebase.firestore();
	// const user = firebase.auth().currentUser;
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then((res) => {
			// console.log(res.user);
			db.collection("users")
				.doc(`${res.user.uid}`)
				.get()
				.then((doc) => {
					if (doc.exists) {
						Swal.fire("登入成功😁😁😁😁");
					} else {
						// doc.data() will be undefined in this case
						db.collection("users")
							.doc(`${res.user.uid}`)
							.set(
								{
									email: res.user.email,
									userImage: res.user.photoURL,
									userName: res.user.displayName,
									userId: res.user.uid,
									userLevel: 0,
									user_banner: "",
								},
								{ merge: true }
							)
							.then((docRef) => {
								Swal.fire("登入成功😁😁😁😁");
								// console.log("😁😁😁😁");
							});
					}
				});
			return res.user;
		})
		.catch((error) => {
			return error;
		});
};

export default socialMediaAuth;
