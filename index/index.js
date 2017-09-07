$(function () {
    //主页请求
    $.get('./song.json').then(function (response) {
        let item = response
        item.forEach((i) => {
            let $li = $(`
            <li>
                <h3>${i.name}<span>${i.description}</span></h3>
                <p>
                    <svg t="1504499575221" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2412" xmlns:xlink="http://www.w3.org/1999/xlink" width="4.2vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z" p-id="2413" fill="#FE672E"></path><path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z" p-id="2414" fill="#FE672E"></path><path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z" p-id="2415" fill="#FE672E"></path></svg>
                    <span class="singer">${i.singer}</span>
                </p>
                 <a href="./play/play.html?id=${i.id}">
                    <svg t="1504492168101" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380" xmlns:xlink="http://www.w3.org/1999/xlink" width="6vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M512 0C229.23 0 0 229.23 0 512c0 282.77 229.23 512 512 512s512-229.23 512-512C1024 229.23 794.771 0 512 0zM512 960C264.577 960 64 759.424 64 512S264.577 64 512 64s448 200.576 448 448S759.424 960 512 960z" p-id="2381" fill="#888888"></path><path d="M384 768 768.826 512 384 256Z" p-id="2382" fill="#888888"></path></svg>
                </a>
            </li>
            `)
            $('#latestmusicList').append($li)
        })
        $('.loading').remove()
    }, function () {
        alert('出错了')
    })

    //选项卡切换
    $('.sitenav').on('click', '.tabitem>li', function (e) {
        let $li = $(e.currentTarget)
        let index = $li.index()
        $li.trigger('tabChange', index)
        $li.addClass('active').siblings().removeClass('active')
    })

    $('.sitenav').on('tabChange', function (e, index) {
        let $contentlis = $('.content>li')
        $contentlis.eq(index).addClass('active').siblings().removeClass('active')

        //热歌榜请求
        if (index === 1) {
            if ($contentlis.eq(index).attr('data-downloaded') == 'yes') { 
                // console.log('请求过了');
                 return 
            }
            $.get('./tab2.json').then(function (result) {
                let item = result;
                let $bottomMore = $(`<div class="fulllist">
                <span>查看完整榜单</span>
                </div>`)
                item.forEach((i) => {
                    let $li = $(`<li>
                    <div class="songindex">${i.id}</div>
                    <div class="song-content">
                        <h3>${i.name}<span>${i.description}</span></h3>
                        <p>
                            <svg t="1504499575221" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2412" xmlns:xlink="http://www.w3.org/1999/xlink" width="4.2vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z" p-id="2413" fill="#FE672E"></path><path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z" p-id="2414" fill="#FE672E"></path><path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z" p-id="2415" fill="#FE672E"></path></svg>
                            <span class="singer">${i.singer}</span>
                        </p>
                    </div>
                    <a href="./play/play.html?id=${i.id}">
                        <svg t="1504492168101" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380" xmlns:xlink="http://www.w3.org/1999/xlink" width="6vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M512 0C229.23 0 0 229.23 0 512c0 282.77 229.23 512 512 512s512-229.23 512-512C1024 229.23 794.771 0 512 0zM512 960C264.577 960 64 759.424 64 512S264.577 64 512 64s448 200.576 448 448S759.424 960 512 960z" p-id="2381" fill="#888888"></path><path d="M384 768 768.826 512 384 256Z" p-id="2382" fill="#888888"></path></svg>
                    </a>
                    </li>`)
                    $('.hotSongList>.songList').append($li)
                    $contentlis.eq(index).attr('data-downloaded', 'yes')
                })
                $('.hotSongList>.songList').append($bottomMore)
                $('.hotSongList>.contentLoading').remove()
            }, function (err) {
                console.log('出错了:' + err)
            })
        }
    })
})


//搜索页面逻辑
$(function () {
    let timer = null;
    let $output=$('.output')
    let $iconback=$('.icon-back')
    let $hotsearch=$('.hot-search')
    $iconback.on('click', function () {
        $('#search').val('')
        $output.text('')
        $hotsearch.addClass('active')
        $iconback.removeClass('active')
        $('.searchSong>.songList').empty()  //清空ul
    })

    $('.hot-search>.list').on('click','li',function(){
        let id=$(this).attr('data-id')
        $hotsearch.removeClass('active')
        $iconback.addClass('active')
        sendRequest(+id) //string=>number
    })

    $('#search').on('input', function (e) {
        $hotsearch.removeClass('active')
        $iconback.addClass('active')
        $('.searchSong>.songList').empty()
        let value = $(e.currentTarget).val().trim()
        if (timer) {
            clearTimeout(timer) //如果300ms内再次输入则清除之前的定时器,重新生成
        }
        if (value === '') { $output.text(''); return }
        startSearch(value)
    })


    function startSearch(value){
        timer = setTimeout(function () {
            search(value).then((result) => {
                if (result.length !== 0) {
                    $output.html(result.map(item => { return `<h3>${item.name }</he>`}))
                    let h3Nodes=document.querySelectorAll('.output>h3')
                    $output[0].onclick=function(e){   //用原生js方法多次绑定事件
                        let $loading = `<img class="contentLoading" src="./images/loading.gif" alt="">`
                        $output.text('')
                        $('.searchSong').append($loading)
                        let index=[].indexOf.call(h3Nodes,e.target)  //区分多个搜索结果
                        let { id } = result[index]
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
        return new Promise((resolve, reject) => {
            var database = [
                {
                    "id": 1,
                    "name": "Ready For It?"
                },
                {
                    "id": 2,
                    "name": "我在夜里偷看过一颗星星"
                },
                {
                    "id": 3,
                    "name": "SHE"
                },
                {
                    "id": 4,
                    "name": "普通人"
                },
                {
                    "id": 5,
                    "name": "Baby U Know"
                },
                {
                    "id": 6,
                    "name": "英雄归来"
                },
                {
                    "id": 7,
                    "name": "谁比我有范儿 (舒服版)"
                },
                {
                    "id": 8,
                    "name": "哭给你听"
                },
                {
                    "id": 9,
                    "name": "云长"
                },
                {
                    "id": 10,
                    "name": "当冬夜渐暖"
                }
            ]
            let result = database.filter(function (item) {
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
            let searchResult = response.filter(i => i.id === id)
            let $li = $(`<li>
            <div class="song-content">
                <h3>${searchResult[0].name}<span>${searchResult[0].description}</span></h3>
                <p>
                    <svg t="1504499575221" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2412" xmlns:xlink="http://www.w3.org/1999/xlink" width="4.2vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z" p-id="2413" fill="#FE672E"></path><path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z" p-id="2414" fill="#FE672E"></path><path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z" p-id="2415" fill="#FE672E"></path></svg>
                    <span class="singer">${searchResult[0].singer}</span>
                </p>
            </div>
            <a href="./play/play.html?id=${searchResult[0].id}">
                <svg t="1504492168101" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380" xmlns:xlink="http://www.w3.org/1999/xlink" width="6vw" height="6vw"><defs><style type="text/css"></style></defs><path d="M512 0C229.23 0 0 229.23 0 512c0 282.77 229.23 512 512 512s512-229.23 512-512C1024 229.23 794.771 0 512 0zM512 960C264.577 960 64 759.424 64 512S264.577 64 512 64s448 200.576 448 448S759.424 960 512 960z" p-id="2381" fill="#888888"></path><path d="M384 768 768.826 512 384 256Z" p-id="2382" fill="#888888"></path></svg>
            </a>
            </li>`)
            $('.searchSong>.contentLoading').remove()
            $('.searchSong>.songList').append($li)
        })
    }

})
