const play = require("./play")
const config = require('../config.json')
const search = require('youtube-search');
const opts = {
    maxResults: 3,
    key: config.YOUTUBE_API,
    type: 'video'
};

module.exports = {
    name: "search",
    description: "Youtube song search",
    execute(message, Discord, args, search, opts, ytdl, queue) {
        
        
    },
    searchOneSong: async function(song) {
        let results = await search(song, opts).catch(err => console.log(err))
            let youtubeResults = results.results
            let selected = youtubeResults[0]
            return selected.link
    }
}