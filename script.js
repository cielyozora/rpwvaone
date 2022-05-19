$(document).ready(function(){
  var obj = [
    {
      name : "VA ONE",
      artist : "EDM Cavern",
      songSource : "mwhpvu78gg8uv?zs=0h1_VntdTy63Qsnw7lBZ8Q&rj-tok=AAABgNdRzzMA087vKFxK638GdQ&rj-ttl=5",
      coverSource : "valogop.png",
      bpm : 82
    }
  ];
  
  var base = "https://node-10.zeno.fm/";
  var base1 = "https://cielyozora.github.io/rpwvaone/"
  var playing = false;
  var currentIndex = 0;
  var audioElement = document.createElement("audio");
  
  function newSong(){
    audioElement.setAttribute("src", base + obj[currentIndex].songSource);
    audioElement.currentTime = 0;
    $("#seekBar").css("width","0%");
    //update thumbnail
    $(".thumbnail").css("background-image","url("+ base1 + obj[currentIndex].coverSource + ")");
    $("#name").text(obj[currentIndex].name);
    $("#author").text(obj[currentIndex].artist);
    console.log(60.0000 / obj[currentIndex].bpm + "s");
    //marquee
    if($("#name").text().length >= 15){
      $("#name").marquee(); 
    }
    if($("#author").text().length >= 30)
      $("#author").marquee();
  }
  function toggle(){//x = playing
    if(playing){//is playing "||"
      $('#toggle .shape, #toggle .nd').css({
        'display':'block',
        'clip-path':'none',
        '-webkit-clip-path':'none',
        '-moz-clip-path':'none',
        'width':'40%'
      });
    }
    else{//is not playing
      $('#toggle .nd').css('display','none');
      $('#toggle .shape').css({
        'clip-path':'polygon(0% 0%, 0% 100%, 100% 50%)',
        '-webkit-clip-path':'polygon(0% 0%, 0% 100%, 100% 50%)',
        '-moz-clip-path':'polygon(0% 0%, 0% 100%, 100% 50%)',
        'width':'100%'
      });
    }
  }
  function convert(x){//x = full seconds
    var min = Math.floor(x/60);
    var sec = Math.floor(x - min *60);;
    if(min<10){
      min = '0' + min;
    }
    if(sec<10){
      sec = '0' + sec;
    }
    return min + ':' + sec;
  }
  function map(maxA,maxB,current){
    //maxA :          maxB         = x(maxA-type) : current(maxB-type)
    //100% : audioElement.duration =      x       : audioElement.current
    return ((current * maxA) / maxB);
  }
  function nextSong(){
    if(currentIndex >= obj.length-1){
      currentIndex = 0;
    }
    else{
      currentIndex ++;
    }
  }
  function prevSong(){
    if(currentIndex <=0){
      currentIndex = obj.length-1;
    }
    else{
      currentIndex--;  
    }
  }
  var date;
  function changeCol(){
    date = new Date();
    if(date.getMinutes() % 2 == 0){
      //pari
      if(date.getMinutes() == 0 || date.getMinutes() == 30){
       $(":root").css({
        "--rdcol" : "#aff",
        "--rdcol2" : "#affa"}); 
      }
      else{
        $(":root").css({
        "--rdcol" : "#faa",
        "--rdcol2" : "#faaa"});  
      }
    }
    else{
      console.log("red");
      $(":root").css({
        "--rdcol" : "#afa",
        "--rdcol2" : "#afaa"});
    }
  }//change bg green,red,blue
  
  setInterval(changeCol,1000);
  newSong();

  audioElement.addEventListener("canplay",function(){
    $("#duration").text(convert(audioElement.duration));
    $("#current").text(convert(audioElement.currentTime));
  });
  audioElement.addEventListener("timeupdate",function(){
    $("#current").text(convert(audioElement.currentTime));
    $("#seekBar").css("width",map(100,audioElement.duration,audioElement.currentTime) + "%");
    if(!audioElement.paused)
      $(".box_content").css("animation-duration", 60.0000 / obj[currentIndex].bpm + "s");
    else
      $(".box_content").css("animation-duration", "0s");
  });  
  audioElement.addEventListener("ended",function(){
    nextSong();
    newSong();
    audioElement.play();
  });
  
  $("#back").click(function(){
    prevSong();
    newSong();
    if(playing){
      audioElement.play();
    }
  });
  $("#toggle").click(function() {
    if(playing){
      audioElement.pause();
      playing = false;
      toggle();
    }
    else{
      audioElement.play();
      playing = true;
      toggle();
    }
  });
  $("#next").click(function(){
    nextSong();//currentIndex++
    newSong();//carica canzone
    if(playing)
      audioElement.play();
  });
  
  $(".progressBar").mouseup(function(e){
    var leftOffset = e.pageX - $(this).offset().left;
    audioElement.currentTime = map(audioElement.duration,$("#track").width(),leftOffset);
  });
});