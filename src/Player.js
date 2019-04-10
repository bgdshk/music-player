import CreateElement from './CreateElement'
import getData from './getData'
import M from 'materialize-css'

class Player {
    constructor() {
        this.amount = 0;
        
        getData('tracks')
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.maxTracksAmount = data.amount
                this.tracks = data.tracks;
                this.render()
            })
        
    }

    play() {
        const player = document.querySelector('audio');
        player.play()
    }

    pause() {
        const player = document.querySelector('audio');
        player.pause()
    }

    stop() {
        const player = document.querySelector('audio');
        player.pause()
        player.currentTime = 0;
    }

    next() {
        if(this.amount < (this.maxTracksAmount - 1)) {
            this.amount += 1;
            this.updatePlayer(this.tracks[this.amount])
            return true;
        }
        M.toast({html: 'No more tracks😢'})
        return false;
    }

    previous() {
        if(this.amount != 0) {
            this.amount -= 1;
            this.updatePlayer(this.tracks[this.amount])
            return true;
        }
        M.toast({html: 'No more tracks😢'})
        return false;
    }

    updatePlayer(src) {
        const player = document.querySelector('audio');
        const title = document.querySelector('.song-title');
        this.stop();
        player.src = `./playlist/${src}`;
        title.innerHTML = src;
        this.play();
    }

    render() {
        CreateElement('audio', {
            src: `./playlist/${this.tracks[0]}`
        })
        CreateElement('div', {
            innerHTML: this.tracks[this.amount],
            className: 'song-title red-text text-lighten-2'
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">skip_previous</i>',
            className: 'btn-floating btn-large waves-effect waves-light red previous_button p_btn',
            onclick: () => {
                this.previous();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">play_arrow</i>',
            className: 'btn-floating btn-large waves-effect waves-light red play_button p_btn',
            onclick: () => {
                this.play();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">stop</i>',
            className: 'btn-floating btn-large waves-effect waves-light red stop_button p_btn',
            onclick: () => {
                this.stop();
            }
        })
        CreateElement('a', {
            innerHTML: '<i class="small material-icons">skip_next</i>',
            className: 'btn-floating btn-large waves-effect waves-light red next_button p_btn',
            onclick: () => {
                this.next();
            }
        })
        
    }
}

export default Player