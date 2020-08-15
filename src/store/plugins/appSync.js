import firebaseApp from "@/store/storage/firebase";
import router from "@/router";

export default store => {
  // Listen for auth state changes, as Firebase will automatically authenticate
  // a user if they have a valid session cookie.
  firebaseApp.auth().onAuthStateChanged(user => {
    store.commit("appLoaded");
    const isGuardedPage =
      ["Register", "Login"].findIndex(
        route => route === router.currentRoute.name
      ) === -1;
    if (user) {
      store.dispatch("fetchPlants");
      store.commit("authenticated");
      return;
    }

    if (isGuardedPage) {
      router.push("/login");
    }
  });
};
