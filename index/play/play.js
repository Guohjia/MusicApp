$(function(){
    var id=location.search.match(/\bid=([^&]*)/)[1]  //获取查询id
    $.get('../song.json').then(function(response){
        song=response.filter(function(i){return i.id==id})
        var url=song[0].url,
            lyric=song[0].lyric,
            name=song[0].name,
            coverimg=song[0].coverimg,
            bgimg=song[0].bgimg
        $(".lyric-description>h2").text(name)
        getlyric(lyric)
        playMusic(url)
        getImage(coverimg,bgimg)
    })
    function getImage(coverimg,bgimg){
        $('.disc-cover').attr('src',coverimg)
        $('.play-page').css('background','url('+bgimg+') center /cover transparent')
    }

    function getlyric(lyric){
        var array = lyric.split('\n')
        var reg = /^\[(.+)\](.*)$/;
        var $lyric=$('.lyric')
        array = array.map(function (item) {
            var result = reg.exec(item)
            if (result) {
                return { time: result[1], words: result[2] }
            }
    
        })
        array.forEach(function (element) {
            var $p =$('</p>') 
            if (typeof element === 'object' && element.hasOwnProperty('words')) {
                $p.attr('data-time',element.time).text(element.words)
            }
            $p.appendTo($lyric)
        });
    }

    function playMusic(url){
        var audio=document.createElement('audio')
        audio.src=url;
        audio.oncanplay=function(){
            audio.play()
            $('.disc').addClass('playing')
            $('.disc-pointer').addClass('active')
        }
        $('.icon-play').on('click',function(){
            audio.play()
            $('.disc').addClass('playing')
            $('.disc-pointer').addClass('active')
        })
        $('.icon-pause').on('click',function(){
            audio.pause()
            $('.disc').removeClass('playing')
            $('.disc-pointer').removeClass('active')
        })
        setInterval(function(){
            var seconds=audio.currentTime
            var minutes=~~(seconds/60)
            var leftTime=seconds-minutes*60
            var time=pad(minutes)+':'+pad(leftTime)
            var $p=$('.lyric>p')
            var $matchLyric
            for(var i=0;i<$p.length;i++){              
                if($p.eq(i).length!==0&&$p.eq(i).attr('data-time') < time&&time<$p.eq(i+1).attr('data-time')){//如果时间再两条歌词显示时间之间,显示前一条歌词,且前提是有下一条歌词
                    $matchLyric=$p.eq(i)
                    break;
                }   
            }
            if($matchLyric){
                var top=$matchLyric.offset().top
                var lineTop=$('.lyric').offset().top
                var delta=top - lineTop -$('.lyric-wrapper').height()/3
                $('.lyric').css('transform','translateY(-'+delta+'px)')
                $matchLyric.addClass('active').prev().removeClass()
            }
        },500)  //500ms匹配依次
    }

    function pad(number){
        return number>=10? number+ '':'0'+number
    }
    
})
