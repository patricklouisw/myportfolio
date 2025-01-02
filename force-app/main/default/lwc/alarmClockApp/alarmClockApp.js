import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3');
    currentTime = "";
    hours = [];
    minutes = [];
    meridiems = ["AM", "PM"];

    isAlarmTriggered = false;
    hourSelected;
    minSelected;
    meridiemSelected;
    alarmTime;
    isAlarmSet = false;

    get isFieldNotSelected(){
        return !(this.hourSelected && this.minSelected && this.meridiemSelected)
    }

    get shakeImage(){
        return this.isAlarmTriggered ? "shake": "";
    }

    connectedCallback(){
        this.createHourOptions();
        this.createMinutesOptions();
        this.currentTimeHandler();
    }

    currentTimeHandler(){
        setInterval(
            () => {
                let dateTime = new Date();
                let hour = dateTime.getHours();
                let min = dateTime.getMinutes();
                let sec = dateTime.getSeconds();
                let ampm = 'AM'

                if (hour == 0){
                    hour = 12;
                } else if (hour == 12 ) {
                    hour = 12;
                    ampm = 'PM'
                }else if (hour > 12) {
                    hour = hour - 12;
                    ampm = 'PM';
                }

                hour = hour > 9 ? hour : "0" + hour;
                min = min > 9 ? min : "0" + min;
                sec = sec > 9 ? sec : "0" + sec;

                this.currentTime = `${hour}:${min}:${sec} ${ampm}`;

                if (this.alarmTime === `${hour}:${min} ${ampm}`) {
                    this.isAlarmTriggered = true;
                    this.ringtone.play();
                    this.ringtone.loop = true;
                }

            }, 1000)
    }

    createHourOptions(){
        for(let i = 1; i <=12; i++){
            let val = i < 10 ? "0" + i : i;
            this.hours.push(val);
        }
    }

    createMinutesOptions(){
        for(let i = 0; i <= 59; i++){
            let val = i < 10 ? "0" + i : i;
            this.minutes.push(val);
        }
    }

    optionhandler(event){
        const {label, value} = event.detail;

        if (label === "Hour(s)") {
            this.hourSelected = value
        } else if (label === "Minute(s)") {
            this.minSelected = value
        } else if (label === "AM/PM") {
            this.meridiemSelected = value
        } else {}
    }

    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minSelected} ${this.meridiemSelected}`
        this.isAlarmSet = true;
    }

    clearAlarmHandler(){
        this.alarmTime = ''
        this.isAlarmSet = false;
        this.isAlarmTriggered = false;
        this.ringtone.pause();

        const elements = this.template.querySelectorAll('c-clock-dropdown');
        Array.from(elements).forEach(element => {
            element.reset("");
        });
    }
}