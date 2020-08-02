import firebaseApp from "./firebase";

class AppStorage {
  constructor(firebaseApp) {
    this.app = firebaseApp;
    this.db = this.app.firestore();
    this.initialized = false;
  }

  async init() {
    await this.app.auth().signInAnonymously();
    this.initialized = true;
  }

  addPlant(plantData) {
    const doc = this.db.collection("plants").doc();
    doc.set(plantData);
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
    const snapshot = await this.db.collection("plants").get();
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
