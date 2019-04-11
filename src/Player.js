import CreateElement from './CreateElement'
import getData from './getData'
import helper from './helpers'
import M from 'materialize-css'

class Player {
    constructor() {
        this.amount = 0;
        this.isPlaying = false;

        document.addEventListener('keydown', e => {
            if(e.which == 32) {
                this.play();
            }
            if(e.which == 39) {
                this.next()
            }
            if(e.which == 37) {
                this.previous()
            }
        })
        
        getData('tracks')
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.maxTracksAmount = data[0].amount
                this.tracks = data;
                this.render()
            })
        
    }

    play() {
        const player = document.querySelector('audio');
        const btn = document.querySelector('.play_button')
        const image = document.querySelector('.player-image');
        if(this.isPlaying) {
            this.isPlaying = false;
            player.pause();
            btn.innerHTML = '<i class="small material-icons">play_arrow</i>'
            image.classList.remove('show')
            image.classList.add('hide')
            return;
        }
        player.play()
        this.isPlaying = true;
        btn.innerHTML = '<i class="small material-icons">pause</i>'
        image.classList.remove('hide')
        image.classList.add('show')
    }

    stop() {
        const player = document.querySelector('audio');
        const btn = document.querySelector('.play_button')
        const image = document.querySelector('.player-image');
        this.isPlaying = false;
        btn.innerHTML = '<i class="small material-icons">play_arrow</i>'
        player.pause()
        player.currentTime = 0;
        image.classList.remove('show')
        image.classList.add('hide')
    }

    next() {
        if(this.amount < (this.maxTracksAmount - 1)) {
            this.amount += 1;
            this.updatePlayer(this.tracks)
            return true;
        }
        M.toast({html: 'No more tracks😢'})
        return false;
    }

    previous() {
        if(this.amount != 0) {
            this.amount -= 1;
            this.updatePlayer(this.tracks)
            return true;
        }
        M.toast({html: 'No more tracks😢'})
        return false;
    }

    volumeChange(value) {
        const player = document.querySelector('audio');
        player.volume = `0.${value}`;
    }

    updatePlayer(src) {
        const player = document.querySelector('audio');
        const title = document.querySelector('.song-title');
        const duration = document.querySelector('.duration');
        this.stop();
        player.src = `./playlist/${src[this.amount].name}`;
        title.innerHTML = src[this.amount].name;
        duration.innerHTML = helper.timeConverter(src[this.amount].duration);
        this.play();
    }

    render() {
        CreateElement('audio', {
            src: `./playlist/${this.tracks[0].name}`
        })
        CreateElement('div', {
            innerHTML: this.tracks[this.amount].name,
            className: 'song-title red-text text-lighten-2'
        })
        CreateElement('form', {
            innerHTML: `<input type="range" id="volume" value="9" min="0" max="9" />`,
            style: 'margin-right: 10px;',
            onchange: e => {
                this.volumeChange(e.target.value)
            }
        })
        CreateElement('div', {
            innerHTML: helper.timeConverter(this.tracks[this.amount].duration),
            className: 'duration red-text text-lighten-2'
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">skip_previous</i>',
            className: 'btn btn-floating red z-depth-2 previous_button p_btn',
            onclick: () => {
                this.previous();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">play_arrow</i>',
            className: 'btn btn-floating btn-large red z-depth-2 play_button p_btn',
            onclick: () => {
                this.play();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">stop</i>',
            className: 'btn btn-floating red z-depth-2 stop_button p_btn',
            onclick: () => {
                this.stop();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">skip_next</i>',
            className: 'btn btn-floating red z-depth-2 next_button p_btn',
            onclick: () => {
                this.next();
            }
        })
        
    }

}

export default Player