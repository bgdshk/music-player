const helper = {
    timeConverter(time) {
        let min, sec;
        min = Math.floor(time / 60)
        sec = Math.floor(time % 60)
        if(min < 10) {
            min = `0${min}`
        }
        if(sec < 10) {
            sec = `0${sec}`
        }
        return `${min}:${sec}`
    }
}

export default helper