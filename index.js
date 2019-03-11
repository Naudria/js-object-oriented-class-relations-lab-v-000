// Construct the following classes:

// Driver class:

// A driver has many trips, and has many passengers through trips.
// new Driver() - initialized with a name; returns a JavaScript object that has attributes of id, and name
// trips() - returns all of the trips that a driver has taken
// passengers() - returns all of the passengers that a driver has taken on a trip
// Passenger class:

// A passenger has many trips, and has many drivers through trips.
// new Passenger() - initialized with a name; returns a JavaScript object that has attributes of id, and name
// trips() - returns all of the trips that a passenger has taken
// drivers() - returns all of the drivers that has taken a passenger on a trip
// Trip class:

// A trip belongs to a driver and belongs to a passenger.
// new Trip() - initialized with an instance of driver and an instance of passenger; returns a JavaScript that object has attributes id, driverId, and passengerId
// driver() - returns the driver associated with the trip
// passenger() - returns the passenger associated with the trip

let store = { drivers: [], passengers: [], trips: [] }
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
    constructor(name) {
        this.name = name
        this.id = ++driverId
        store.drivers.push(this)
    }
    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.driverId === this.id;
            }.bind(this)
        );
    }
    passengers() {
        return this.trips().map(trip => {
            return trip.passenger();
        });
    }
}

class Passenger {
    constructor(name) {
        this.name = name
        this.id = ++passengerId
        store.passengers.push(this)
    }
    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.passengerId === this.id;
            }.bind(this)
        );
    }
    drivers() {
        return this.trips().map(trip => {
            return trip.driver();
        });
    }
}

class Trip {
    constructor(driver, passenger) {
        if (driver) {
            this.setDriver(driver)
        }
        if (passenger) {
            this.setPassenger(passenger)
        }
        // this.driverId = driverId
        // this.passengerId = passengerId
        this.id = ++tripId
        store.trips.push(this)
    }
    setDriver(driver) {
        this.driverId = driver.id
    }
    setPassenger(passenger) {
        this.passengerId = passenger.id
    }
    passenger() {
        return store.passengers.find(
            function(passenger) {
                return passenger.id === this.passengerId;
            }.bind(this)
        );
    }
    driver() {
        return store.drivers.find(
            function(driver) {
                return driver.id === this.driverId;
            }.bind(this)
        );
    }

}