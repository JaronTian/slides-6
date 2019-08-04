
let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0 // 当前是第几张，从 0 开始



bindEvents()
$(next).on('click', function(){ // 下一张
    goToSlide(current+1)
})
$(previous).on('click', function(){ // 上一张
    goToSlide(current-1)
})

let timer = setInterval(function(){ // 轮播定时器
    goToSlide(current+1)
},2000)

// 解决当页面被隐藏时，浏览器会将轮播变慢
document.addEventListener('visibilitychange', function(e){ // 可见性更改事件
    if(document.hidden){ // 该属性表示页面是（true）否（false）隐藏
        clearInterval(timer) // 页面隐藏，就停止轮播
    }else{
        timer = setInterval(function(){ // 轮播定时器
            goToSlide(current+1)
        },2000)
    }
})


$('.container').on('mouseenter', function(){
    clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){ // 轮播定时器
        goToSlide(current+1)
    },2000)
})

function bindEvents(){
    $('#buttonWrapper').on('click', 'button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

function goToSlide(index){ //去第几张，从 0 开始
    if(index >$buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    if(current === $buttons.length -1 && index === 0){ // current 当前的，index 要去的。从最后一张到第一张
        $slides.css({transform: 'translateX(0px)'})
        current = index
    }else if(current === 0 && index === $buttons.length -1){ // 从第一张到最后一张
        $slides.css({transform: `translateX(${-($buttons.length -1) *400}px)`})
        current = index
    }else{
        $slides.css({transform: `translateX(${-index *400}px)`})
        current = index
    }
}
