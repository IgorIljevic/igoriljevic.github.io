 
function _(id){
    return document.getElementById(id);
}

var player = null;
var player_vid = null;
var plcnt = null;
var player_black = null;

function showplayer(){
    plcnt.style.display = "block";
    player_black.style.backgroundColor = "#0000007f";
    
    setTimeout(()=>{
        player.className = "player player_visible";
        setTimeout(()=>{
            player_vid.play();
        }, 100);
    }, 20);
}
function hideplayer(){
    player.className = "player player_hidden";
    player_vid.pause();
    player_black.style.backgroundColor = "#00000000";
    setTimeout(() => {
        plcnt.style.display = "none";
    }, 600);
}
function player_playpause(){
    if(player_vid.paused){
        player_vid.play(); 
    }else{
        player_vid.pause(); 
    }
}
window.addEventListener("load", async function(){
    var vlist = _("videolist");
    player = _("player");
    player_vid = _("player_vid");
    plcnt = _("playercnt");
    player_black = _("player_black");
    player_black.addEventListener("click", hideplayer);
    
    var resptext = "";
    await fetch("video/videos.list").then(r => r.text()).then(resptext => {
        var lns = resptext.split("\n");
        for(i in lns){
            var v = document.createElement("video");
            v.src = "video/" + lns[i];
            v.className = "vidrect";
            v.addEventListener("click", function(){
                player_vid.src = this.src;
                showplayer();
            });
            vlist.appendChild(v);
        }
    });
});

