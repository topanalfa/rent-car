<template>
  <div id="add-car">
    <h3>Add Car</h3>
    <div class="float-left">
      <router-link class="btn btn-default" to="/">Back</router-link>
    </div>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addCar">
          <div class="form-group">
            <label for="regist_number">Regist Number Car</label>
            <input type="text" class="form-control" v-model="regist_number" />
          </div>
          <div class="form-group">
            <label for="color">Color</label>
            <select class="form-control" v-model="color">
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="grey">Grey</option>
            </select>
          </div>
          <router-link type="button" to="/" class="btn btn-danger">Cancel</router-link>
          <button type="submit" class="btn btn-success">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "add-car",
  data() {
    return {
      regist_number: null,
      color: null
    };
  },
  methods: {
    addCar() {
      let data = {
        regist_number: this.regist_number,
        color: this.color,
        status: "free",
        customer: "",
        rent_date: new Date()
      };
      db.collection("cars")
        .add(data)
        .then(docRef =>
          this.$router.push("/").catch(error => console.log(error))
        );
    }
  }
};
</script>