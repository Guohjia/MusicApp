(function(){
    let id=location.search.match(/\bid=([^&]*)/)[1]
    $.get('../song.json').then(function(response){
        song=response.filter(i=>i.id==id)
        let {url}=song[0]
        let audio=document.createElement('audio')
        audio.src=url
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
    })

    $.get('./lyric.json').then(function (object) {
        let { lyric } = object
        let array = lyric.split('\n')
        let reg = /^(\[.+\])(.*)$/;
        // let frag = document.createDocumentFragment()
        let $lyric=$('.lyric')
        array = array.map(function (item) {
            // console.log(item)
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
    })
    
})()
