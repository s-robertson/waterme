import firebaseApp from "@/services/firebase";

class AppAuth {
  constructor(firebase) {
    this.firebase = firebase;
    this.auth = firebase.auth();
    this.currentUser = null;
    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  async login(email, password) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      const messages = [err.message];
      throw { messages };
    }
  }

  async logout() {
    await this.auth.signOut();
  }

  async register(email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      const messages = [err.message];
      throw { messages };
    }
  }
}

export default new AppAuth(firebaseApp);
