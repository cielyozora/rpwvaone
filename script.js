const audioElem=document.querySelector("#audioElem");
   const stopBtn=document.querySelector("#stopBtn");
   const nextBtn=document.querySelector("#nextBtn");
   const prevBtn=document.querySelector("#prevBtn");
   const playPauseBtn=document.querySelector("#playPauseBtn");
   const speakers=document.querySelectorAll(".speaker");
   const clickSound=new Audio("https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/click-sound.mp3");
   const songs=["https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/a-better-place-to-live.mp3","https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/sing-me-to-sleep.mp3","https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/angels-like-you.mp3"];
   let songIndex=0;
   function nextSong(){
     clickSound.play();
 if(nextBtn.checked){
     songIndex++;
       songIndex >= songs.length ? songIndex=0 : "";
       audioElem.src=songs[songIndex];
             playAudio();

       setTimeout(()=>{
       nextBtn.checked=false
     },500)
 }

   }
   
      function prevSong(){
       clickSound.play();
 if(prevBtn.checked){
     songIndex--;
       songIndex < 0 ? songIndex=songs.length-1 : "";
      audioElem.src=songs[songIndex];
      playAudio();
     setTimeout(()=>{
       prevBtn.checked=false;
     },500)
 }
   }
   
  function stopAudio(){
     clickSound.play();
    playPauseBtn.checked=false;
    audioElem.currentTime=0;
    playAudio();
  }
   function playAudio(){
         clickSound.play();
     let isChecked=playPauseBtn.checked;
     if(isChecked && audioElem.paused){
       stopBtn.checked=false;
       audioElem.play();
       for(let i=0;i < speakers.length;i++){
         speakers[i].classList.add("pop");
       }
     }
     else{
       
       audioElem.pause();
            for(let i=0;i < speakers.length;i++){
         speakers[i].classList.remove("pop");

       }
     }
   }
   audioElem.addEventListener("ended",stopAudio);
   prevBtn.addEventListener("click",prevSong);
   nextBtn.addEventListener("click",nextSong);
   stopBtn.addEventListener("click",stopAudio);
   playPauseBtn.addEventListener("click",playAudio);