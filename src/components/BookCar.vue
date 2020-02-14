<template>
  <div id="book-car">
    <h3>Book a Car</h3>
    <div class="float-left">
      <router-link class="btn btn-default" to="/">Back</router-link>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="list-group">
          <div class="list-group-item align-items-start">
            <div class="d-flex w-50 justify-content-between">
              <h5 class="mb-1">{{regist_number}}</h5>
              <small>{{color}}</small>
              <span>{{customer}}</span>
            </div>
            <p class="mb-1">{{status}}</p>
            <form @submit.prevent="bookCar">
              <input
                class="form-control"
                type="hidden"
                name="car_id"
                value="car_id"
                v-model="car_id"
              />
              <div class="form-group">
                <label for="customer">Your name</label>
                <input
                  class="form-control"
                  type="text"
                  name="customer"
                  id="customer"
                  v-model="customer"
                />
              </div>
              <div class="form-group">
                <label>Pick a date</label>
                <input class="form-control" type="date" name="rent_date" v-model="rent_date" />
              </div>
              <button :disabled="booked" class="btn btn-primary" type="submit">Serve Car</button>
              <span v-if="booked">Car Booked</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "book-car",
  data() {
    return {
      car_id: null,
      regist_number: null,
      color: null,
      status: null,
      customer: null,
      rent_date: null,
      booked: false
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("cars")
      .where("car_id", "==", to.params.car_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.car_id = doc.data().car_id;
            vm.regist_number = doc.data().regist_number;
            vm.color = doc.data().color;
            vm.status = doc.data().status;
            vm.customer = doc.data().customer;
            vm.rent_date = doc.data().rent_date;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("cars")
        .where("car_id", "==", this.$route.params.car_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.car_id = doc.data().car_id;
            this.regist_number = doc.data().regist_number;
            this.color = doc.data().color;
            this.status = doc.data().status;
            this.customer = doc.data().customer;
            this.rent_date = doc.data().rent_date;
          });
        });
    },
    bookCar() {
      let data = {
        status: "booked",
        customer: this.customer,
        rent_date: this.rent_date
      };
      db.collection("cars")
        .where("car_id", "==", this.$route.params.car_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(data);
          });
        })
        .then(docRef => {
          if (this.status == "booked") this.booked = true;
          alert("car successfully booked");
          this.$router.push("/");
        });
    }
  }
};
</script>