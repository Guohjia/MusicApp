$(function () {
    //主页请求
    $.get('./song.json').then(function (response) {
        var item = response
        item.forEach(function(i){
            var $li='<li>'+
                     '<h3>'+i.name+'<span>'+i.description+'</span></h3>'+
                     '<p>'+
                         '<img src="./images/sq.png" alt="" class="sq">'+
                         '<span class="singer">'+i.singer+'</span>'+
                     '</p>'+
                      '<a href="./play/play.html?id='+i.id+'">'+
                         '<img src="./images/play.png" alt="" style="height:5vw;width:5vw">'+
                    '</a>'+
                    '</li>'
            $('#latestmusicList').append($($li))
        })
        $('.loading').remove()
    }, function () {
        alert('出错了')
    })

    //选项卡切换
    $('.sitenav').on('click', '.tabitem>li', function (e) {
        var $li = $(e.currentTarget)
        var index = $li.index()
        $li.trigger('tabChange', index)
        $li.addClass('active').siblings().removeClass('active')
    })

    $('.sitenav').on('tabChange', function (e, index) {
        var $contentlis = $('.content>li')
        $contentlis.eq(index).addClass('active').siblings().removeClass('active')

        //热歌榜请求
        if (index === 1) {
            if ($contentlis.eq(index).attr('data-downloaded') == 'yes') { 
                // console.log('请求过了');
                 return 
            }
            $.get('./tab2.json').then(function (result) {
                var item = result;
                var $bottomMore = '<div class="fulllist">'+
                '<span>查看完整榜单</span>'+
                '</div>'
                item.forEach(function(i){
                    var $li='<li>'+
                    '<div class="songindex">'+i.id+'</div>'+
                    '<div class="song-content">'+
                        '<h3>'+i.name+'<span>'+i.description+'</span></h3>'+
                        '<p>'+
                        '<img src="./images/sq.png" alt="" class="sq">'+
                            '<span class="singer">'+i.singer+'</span>'+
                        '</p>'+
                    '</div>'+
                    '<a href="./play/play.html?id='+i.id+'">'+
                        '<img src="./images/play.png" alt="" style="height:5vw;width:5vw">'+
                    '</a>'+
                    '</li>'
                    $('.hotSongList>.songList').append($($li))
                    $contentlis.eq(index).attr('data-downloaded', 'yes')
                })
                $('.hotSongList>.songList').append($($bottomMore))
                $('.hotSongList>.contentLoading').remove()
            }, function (err) {
                console.log('出错了:' + err)
            })
        }
    })
})


// 搜索页面逻辑
$(function () {
    var timer = null;
    var $output=$('.output')
    var $iconback=$('.icon-back')
    var $hotsearch=$('.hot-search')
    $iconback.on('click', function () {
        $('#search').val('')
        $output.text('')
        $hotsearch.addClass('active')
        $iconback.removeClass('active')
        $('.searchSong>.songList').empty()  //清空ul
    })

    $('.hot-search>.list').on('click','li',function(){
        var id=$(this).attr('data-id')
        $hotsearch.removeClass('active')
        $iconback.addClass('active')
        sendRequest(+id) //string=>number
    })

    $('#search').on('input', function (e) {
        $hotsearch.removeClass('active')
        $iconback.addClass('active')
        $('.searchSong>.songList').empty()
        var value = $(e.currentTarget).val().trim()
        if (timer) {
            clearTimeout(timer) //如果300ms内再次输入则清除之前的定时器,重新生成
        }
        if (value === '') { $output.text(''); return }
        startSearch(value)
    })


    function startSearch(value){
        timer = setTimeout(function () {
            search(value).then(function(result){
                if (result.length !== 0) {
                    $output.html(result.map(function(item){ return '<h3>'+item.name+'</h3>'}))
                    var h3Nodes=document.querySelectorAll('.output>h3')
                    $output[0].onclick=function(e){   //用原生js方法多次绑定事件
                        var $loading = '<img class="contentLoading" src="./images/loading.gif" alt="">'
                        $output.text('')
                        $('.searchSong').append($loading)
                        var index=[].indexOf.call(h3Nodes,e.target)  //区分多个搜索结果
                        var id  = result[index].id
                        sendRequest(id)
                    }
                } else {
                    $output.text('没有结果')
                }
                timer = null;  //开始执行定时器内容,执行结束之后清除定时器,下次输入重新生成
            })
        }, 400)  //如果400ms内再次输入则清除之前的定时器,重新生成
    }

    function search(keyword) {
        return new Promise(function(resolve, reject){
            var database = [
                {
                    "id": "01",
                    "name": "Ready For It?"
                },
                {
                    "id": "02",
                    "name": "我在夜里偷看过一颗星星"
                },
                {
                    "id": "03",
                    "name": "SHE"
                },
                {
                    "id": "04",
                    "name": "普通人"
                },
                {
                    "id": "05",
                    "name": "Baby U Know"
                },
                {
                    "id": "06",
                    "name": "英雄归来"
                },
                {
                    "id": "07",
                    "name": "谁比我有范儿 (舒服版)"
                },
                {
                    "id": "08",
                    "name": "哭给你听"
                },
                {
                    "id": "09",
                    "name": "云长"
                },
                {
                    "id": "10",
                    "name": "当冬夜渐暖"
                }
            ]
            var result = database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0 || item.name.indexOf(keyword.toUpperCase()) >= 0
            })
            setTimeout(function () {
                console.log('搜到' + keyword + '的结果')
                resolve(result)
            }, (Math.random() * 200 + 1000));  //随机数模拟不规则响应的请求
        })
    }

    function sendRequest(id){
        $.get('./tab2.json').then(function (response) {
            var searchResult = response.filter(function(i){return i.id == id})
            var $li = '<li>'+
            '<div class="song-content"'+
                '<h3>'+searchResult[0].name+'<span>'+searchResult[0].description+'</span></h3>'+
                '<p>'+
                    '<img src="./images/sq.png" alt="" class="sq">'+
                    '<span class="singer">'+searchResult[0].singer+'</span>'+
                '</p>'+
            '</div>'+
            '<a href="./play/play.html?id='+searchResult[0].id+'">'+
                '<img src="./images/play.png" alt="" style="height:5vw;width:5vw">'+
            '</a>'+
            '</li>'
            $('.searchSong>.contentLoading').remove()
            $('.searchSong>.songList').append($($li))
        })
    }

})
