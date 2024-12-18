import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = '';
    weight = '';
    bmiValue = '';
    result = '';

    inputHandler(event){
        const {name, value} = event.target;

        if (name === "height"){
            this.height = value;
        } else if (name === "weight"){
            this.weight = value;
        }
        // Alternatively, the code below can also work
        // this[name] = value
    }

    submitHandler(event){
        event.preventDefault();
        console.log(this.height);
        console.log(this.weight);
        this.calculate();
    }

    calculate(){
        const height = Number(this.height) / 100;
        const bmi = Number(this.weight) / (height*height);
        this.bmiValue = Number(bmi.toFixed(2));
        
        if (this.bmiValue < 18.5){
            this.result = "Underweight";
        } else if(this.bmiValue >= 18.5 && this.bmiValue < 25) {
            this.result = "Healthy";
        } else if(this.bmiValue >= 25 && this.bmiValue < 30) {
            this.result = "Overweight";
        } else {
            this.result = "Obese";
        }

        console.log(bmi);
        console.log(this.result);

    }

    recalculate(){
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
        this.result = '';    
    }
}