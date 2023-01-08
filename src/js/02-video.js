import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if(localStorage.getItem('videoplayer-current-time')) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
const setTime = (e) => {
    localStorage.setItem("videoplayer-current-time",  e.seconds)
} 
player.on('timeupdate', throttle(setTime, 1000, { 'trailing': false }));

