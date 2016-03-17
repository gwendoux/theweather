function timer(node, time) {
    setTimeout(function(){
        node.remove();
    },time);
}

exports.timer = timer;
