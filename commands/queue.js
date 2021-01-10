global.MusicQueue = new Map()

module.exports = {
    addQueue: function(guildID, song) {
        let queued = MusicQueue.get(guildID)
        if (queued == null) {
            let songs = [song]
            MusicQueue.set(guildID, songs)
        } else {
            queued.push(song)
            MusicQueue.set(guildID, queued)
        }
        console.log('added queue values: ' + guildID + ', ' + song)
    },
    removeFromQueueString: function(guildID, song) {
        let queued = MusicQueue.get(guildID)
        queued.remove(song)
        MusicQueue.set(guildID, queued)
    },
    removeFromQueueInt: function(guildID, count) {
        let queued = MusicQueue.get(guildID)
        queued.shift()
        MusicQueue.set(guildID, queued)
    },
    getQueue: function(guildID) {
        let queued = MusicQueue.get(guildID)
        return queued
    }
}


//remove from array with name
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
}