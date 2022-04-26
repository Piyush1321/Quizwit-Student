class DateTime {

    constructor(timestamp) {
        this.timestamp = timestamp;
    }

    convert() {
        let parts = this.timestamp.split(', ');
        let date = parts[0];
        let time = parts[1];
        console.log(date);
        let dateParts = date.split('/');
        let dd = dateParts[0];
        let mm = dateParts[1];
        let yyyy = dateParts[2];

        date = yyyy + '-' + mm + '-' + dd;
        this.timestamp = date + 'T' + time;
        return this.timestamp;

    }

    convertToView() {
        const date = new Date(this.timestamp);
        
        return date.toLocaleString();
        // let parts = this.timestamp.split(' ');
        // let date = parts[0];
        // let time = parts[1];

        // let dateParts = date.split('-');
        // let yyyy = dateParts[0];
        // let mm = dateParts[1];
        // let dd = dateParts[2];

        // let timeParts = parts[1].split(':');
        // let hr = timeParts[0];
        // let min = timeParts[1];
        // hr = parseInt(hr);
        // let timeLabel = 'AM';
        // if(hr >= 12 && hr < 24)
        //     timeLabel = 'PM'
        // time = hr + ':' + min + ' ' + timeLabel;
        // date = dd + '-' + mm + '-' + yyyy;
        // this.timestamp = date + ' ' + time;
        // return this.timestamp;
    }

}

export default DateTime;