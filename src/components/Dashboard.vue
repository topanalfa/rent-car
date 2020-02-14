<template>
  <div id="dashboard">
    <div class="row">
      <div class="col-md-8">
        <h3>Dashboard</h3>
        <ul class="list-group">
          <li v-for="car in cars" v-bind:key="car.id" class="list-group-item">
            <h4>{{car.regist_number}} - {{car.color}}</h4>
            <div class="float-right">
              <router-link
                v-if="car.status == 'free'"
                class="btn btn-success"
                role="button"
                v-bind:to="{name: 'book-car', params: {car_id: car.car_id}}"
              >Book Now</router-link>
              <button v-if="car.status == 'booked'" class="btn btn-default" disabled>Booked</button>
            </div>
            <span class="badge badge-pill">{{car.status}}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <router-link to="/add" class="btn btn-primary" role="button">Add Car</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "Dashboard",
  data() {
    return {
      cars: []
    };
  },
  created() {
    db.collection("cars")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            car_id: doc.data().car_id,
            color: doc.data().color,
            regist_number: doc.data().regist_number,
            status: doc.data().status,
            customer: doc.data().customer
          };
          this.cars.push(data);
        });
      });
  }
};
</script>