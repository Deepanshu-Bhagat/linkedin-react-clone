import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import db, { storage } from '../firebaseConfig';
import { articleActions } from './article-slice';

export const postArticleAPI = (payload) => {
  return (dispatch) => {
    if (payload.image) {
      dispatch(articleActions.setLoading(true));
      const metadata = {
        contentType: 'image/*',
      };
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        payload.image,
        metadata
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');

          if (snapshot.state === 'running') {
            console.log('Upload is running');
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = await addDoc(collection(db, 'articles'), {
              actor: {
                description: payload.user.email,
                title: payload.user.name,
                date: payload.timeStamp,
                image: payload.user.image,
              },
              video: null,
              shareImg: downloadURL,
              Comments: 0,
              description: payload.description,
            });
            dispatch(articleActions.setLoading(false));
          } catch (e) {
            console.error('Error adding document: ', e);
            dispatch(articleActions.setLoading(false));
          }
        }
      );
    } else if (payload.video) {
      dispatch(articleActions.setLoading(true));
      const metadata = {
        contentType: 'video/*',
      };
      const storageRef = ref(storage, `videos/${payload.video.name}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        payload.video,
        metadata
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');

          if (snapshot.state === 'running') {
            console.log('Upload is running');
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = await addDoc(collection(db, 'articles'), {
              actor: {
                description: payload.user.email,
                title: payload.user.name,
                date: payload.timeStamp,
                image: payload.user.image,
              },
              video: downloadURL,
              shareImg: null,
              comments: 0,
              description: payload.description,
            });
            dispatch(articleActions.setLoading(false));
          } catch (e) {
            console.error('Error adding document: ', e);
            dispatch(articleActions.setLoading(false));
          }
        }
      );
    }
  };
};

export const getArticleAPI = () => {
  return async (dispatch) => {
    let payload;

    // const articlesRef = collection(db, 'articles');
    // const querySnapshot = await getDocs(
    //   query(articlesRef, orderBy('actor.date', 'desc'))
    // );
    // querySnapshot.forEach((doc) => {
    //   payload.push({ id: doc.id, ...doc.data() });
    // });
    // dispatch(articleActions.setArticles(payload));

    const articlesRef = collection(db, 'articles');
    onSnapshot(
      query(articlesRef, orderBy('actor.date', 'desc')),
      (snapshot) => {
        payload = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        dispatch(articleActions.setArticles(payload));
      }
    );
  };
};
