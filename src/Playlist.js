import CreateElement from './CreateElement'
import getData from './getData'
import helper from './helpers'
import M from 'materialize-css'

class Playlist {
    constructor() {
        getData('tracks')
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.render(data)
            })
    }

    generatePlaylistItem(options = {}) {
        return `<i class="material-icons circle red">play_arrow</i>
                <span class="title">${options.title}</span>
                <p>${options.first}<br>${options.second}</p>`
                // <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    }

    render(data) {
        CreateElement('ul', {
            className: 'collection grey darken-2',
            style: 'border-color: #333;'
        }, '#playlist')

        let tracks = data;

        for(let t = 0; t < tracks.length; t++) {
            CreateElement('li', {
                className: 'collection-item avatar grey darken-4 hoverable',
                style: 'border-color: #333; color: #eee',
                innerHTML: this.generatePlaylistItem({
                    title: tracks[t].name,
                    first: `---`,
                    second: `Duration: ${helper.timeConverter(tracks[t].duration)}`
                }),
            }, '.collection')
        }
    }
}

export default Playlist