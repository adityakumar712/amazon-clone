class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'close';
        // console.log(`${this.#brand} , ${this.model} , speed: ${this.speed} km/h , Trunk:${trunkStatus}`);
    }


    go(){
        if(!this.isTrunkOpen){
            this.speed+=5;
        }

        if(this.speed > 200){
            this.speed = 0;
        }
    }

    break(){
        this.speed-=5;
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
       this.isTrunkOpen = false;
    }


}

const car1 = new Car(
    {
        brand:'Toyota',
        model:'Corolla'
        
    }
);
const car2 = new Car(
    {
        brand:'Tesla',
        model: 'model-3'
    }
);

// console.log(car1);
// console.log(car2);


car1.break;
car1.displayInfo();
car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.break();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.go();
car2.go();
car2.go();
car2.break();
car2.displayInfo();

car2.openTrunk();
car2.go();
car2.displayInfo();

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        this.speed = this.acceleration;

        if(this.speed > 300){
            this.speed = 300;
        }
    }

    openTrunk(){
        // console.log('Race car do not have a trunk');
    }

    closeTrunk(){
        // console.log('Race car do not have have a trunk');
    }
}


const racecar = new RaceCar({
    brand : 'McLearn',
    model:'F1',
    acceleration:320
});



racecar.go();
racecar.displayInfo();
