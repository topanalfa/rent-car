<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
    <div class="float-right">
      <router-link to="/add" class="btn btn-primary" role="button"
        >Add Car</router-link
      >
    </div>
    <div class="row mb-2">
      <div class="col-md-3">
        <input
          class="form-control "
          v-on:keyup="searchCar"
          type="text"
          v-model="word"
          placeholder="Search..."
        />
      </div>
      <div class="col-md-3">
        <select
          class="form-control"
          v-on:change="filterByColor($event)"
          name="filter-car"
        >
          <option selected>Filter by color...</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="silver">Silver</option>
        </select>
      </div>
      <div class="col-md-3">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            v-on:change="filterByStatus($event)"
            type="checkbox"
            value="free"
          />
          <label class="form-check-label mr-2" for="free">Free</label>
          <input
            class="form-check-input"
            v-on:change="filterByStatus($event)"
            type="checkbox"
            value="booked"
          />
          <label class="form-check-label" for="free">Booked</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <ul class="list-group">
          <li
            v-for="car in filterCar"
            v-bind:key="car.id"
            class="list-group-item"
          >
            <h4>{{ car.regist_number }} - {{ car.color }}</h4>
            <div class="float-right">
              <router-link
                v-if="car.status == 'free'"
                class="btn btn-success"
                role="button"
                v-bind:to="{ name: 'book-car', params: { car_id: car.car_id } }"
                >Book Now</router-link
              >
              <button
                v-if="car.status == 'booked'"
                class="btn btn-default"
                disabled
              >
                Booked
              </button>
            </div>
            <span class="badge badge-pill">{{ car.status }}</span>
            <span v-if="car.customer" style="font-weight:500;"
              >by {{ car.customer }}</span
            >
          </li>
        </ul>
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
      cars: [],
      filterCar: [],
      word: "",
      status: ""
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
          this.filterCar = this.cars;
        });
      });
  },
  methods: {
    filterByColor(e) {
      this.filterCar = this.cars.filter(key => {
        return key.color === e.target.value;
      });
    },
    searchCar() {
      this.filterCar = this.cars.filter(
        key =>
          key.regist_number.toLowerCase().indexOf(this.word.toLowerCase()) > -1
      );
    },
    filterByStatus(e) {
      if (e.target.value !== null) {
        this.filterCar = this.cars.filter(key => {
          return key.status === e.target.value;
        });
      }
      return this.filterCar;
    }
  }
};
</script>
