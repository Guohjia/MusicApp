(function(){
    let id=location.search.match(/\bid=([^&]*)/)[1]
    $.get('../song.json').then(function(response){
        song=response.filter(i=>i.id==id)
        let {url,lyric,name}=song[0]
        $(".lyric-description>h2").text(name)
        getlyric(lyric)
        playMusic(url)
    })


    function getlyric(lyric){
        let array = lyric.split('\n')
        let reg = /^\[(.+)\](.*)$/;
        let $lyric=$('.lyric')
        array = array.map(function (item) {
            let result = reg.exec(item)
            if (result) {
                return { time: result[1], words: result[2] }
            }
    
        })
        array.forEach(function (element) {
            let $p =$('</p>') 
            if (typeof element === 'object' && element.hasOwnProperty('words')) {
                $p.attr('data-time',element.time).text(element.words)
            }
            $p.appendTo($lyric)
        });
    }

    function playMusic(url){
        let audio=document.createElement('audio')
        audio.src=url;
        audio.oncanplay=function(){
            audio.play()
            $('.disc').addClass('playing')
        }
        $('.icon-play').on('click',function(){
            audio.play()
            $('.disc').addClass('playing')
        })
        $('.icon-pause').on('click',function(){
            audio.pause()
            $('.disc').removeClass('playing')
        })
        setInterval(function(){
            let seconds=audio.currentTime
            let minutes=~~(seconds/60)
            let leftTime=seconds-minutes*60
            let time=`${pad(minutes)}:${pad(leftTime)}`
            let $p=$('.lyric>p')
            let $matchLyric
            for(var i=0;i<$p.length;i++){              
                if($p.eq(i).length!==0&&$p.eq(i).attr('data-time') < time&&time<$p.eq(i+1).attr('data-time')){//如果时间再两条歌词显示时间之间,显示前一条歌词,且前提是有下一条歌词
                    $matchLyric=$p.eq(i)
                    break;
                }   
            }
            if($matchLyric){
                let top=$matchLyric.offset().top
                console.log(top)
                let lineTop=$('.lyric').offset().top
                console.log(lineTop)
                let delta=top - lineTop -$('.lyric-wrapper').height()/3
                $('.lyric').css('transform',`translateY(-${delta}px)`)
                $matchLyric.addClass('active').prev().removeClass()
            }
        },500)  //500ms匹配依次
    }

    function pad(number){
        return number>=10? number+ '':'0'+number
    }
    // $.get('./lyric.json').then(function (object) {
    //     let { lyric } = object
        
    // })
    
})()
