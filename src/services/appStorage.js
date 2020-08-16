import firebaseApp from "./firebase";
import appAuth from "@/services/auth";

class AppStorage {
  constructor(firebaseApp) {
    this.app = firebaseApp;
    this.db = this.app.firestore();
  }

  addPlant(plantData) {
    const doc = this.db.collection("plants").doc();
    doc.set({
      ...plantData,
      ...{
        uid: this.app.auth().currentUser.uid
      }
    });
    return doc.id;
  }

  async deletePlant(id) {
    return this.db
      .collection("plants")
      .doc(id)
      .delete();
  }

  async updatePlant(id, newData) {
    return this.db
      .collection("plants")
      .doc(id)
      .update(newData);
  }

  async fetchPlants() {
    if (!appAuth.isLoggedIn()) {
      return [];
    }

    const snapshot = await this.db
      .collection("plants")
      .where("uid", "==", this.app.auth().currentUser.uid)
      .get();
    const plants = [];
    snapshot.forEach(doc => {
      plants.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return plants;
  }
}

export default new AppStorage(firebaseApp);
