import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export const getAllPosts = async () => {
    return await getDocs(collection(db, 'posts')).then((snaps) => snaps.docs.map((d) => d.data()))
}

export const getAllPostsWithCategory = async (categoryId) => {
    const q = query(collection(db, 'posts'), where('categoryId', '==', categoryId))
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}



export const getPost = async (id) => {
    try {
        const decodedId = decodeURIComponent(id);
       // console.log("Fetching post with id:", decodedId);

        const postDoc = doc(db, `posts/${decodedId}`);
        const snap = await getDoc(postDoc);

        const postData = snap.data();
        //console.log("Fetched post data:", postData);

        if (postData) {
            console.log("Title:", postData.title);
        } else {
            console.error("No data found for the given ID");
        }

        return postData;
    } catch (err) {
        console.error("Error fetching post:", err);
        throw err;
    }
};

