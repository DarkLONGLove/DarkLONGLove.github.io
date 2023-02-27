//获取猫和它的身体
const cats = document.getElementById("cat");

const catBody = cats.getElementsByTagName("div");
//获取鱼
const fish = document.getElementById("fish");
//获取开始游戏按钮
const button = document.getElementById("button");
//获取介绍窗口
const Introduction = document.getElementById("Introduction");

//获取分数和等级
const score = document.getElementById("score");
const level = document.getElementById("level");
let sco = 0;
let lev = 0;

//存储方向键的数组
const keyKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
//存储上下矛盾时的对象
const keyKe = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};
//==============================================================================
//生成鱼的随机位置的函数
function fishweizi() {
  //获取2个（0-30）的随机数
  const x = Math.floor(Math.random() * 30) * 10;
  const y = Math.floor(Math.random() * 30) * 10;
  //将生成的随意数赋值给鱼的坐标
  fish.style.left = x + "px";
  fish.style.top = y + "px";
}
//==============================================================================
// 设置猫头移动的函数
function auto() {
  //获取猫头
  const catHead = catBody[0];
  let x = catHead.offsetLeft;
  let y = catHead.offsetTop;
  switch (fang) {
    case "ArrowUp": {
      y -= 10;
      break;
    }
    case "ArrowDown": {
      y += 10;
      break;
    }
    case "ArrowLeft": {
      x -= 10;
      break;
    }
    case "ArrowRight": {
      x += 10;
      break;
    }
  }
  //设置撞墙
  if (x < 0 || x > 290 || y < 0 || y > 290) {
    alert("猫猫不想要撞墙！");
    gameover();
    return;
  }
  //设置撞自己
  for (i = 0; i < catBody.length - 1; i++) {
    if (catBody[i].offsetLeft === x && catBody[i].offsetTop === y) {
      alert("猫猫撞到自己了！");
      gameover();
      return;
    }
  }
  //猫吃到鱼，触发事件
  if (
    fish.offsetTop === catHead.offsetTop &&
    fish.offsetLeft === catHead.offsetLeft
  ) {
    fishweizi();
    cats.insertAdjacentHTML(
      "beforeend",
      "<div><i class='fas fa-cat'></i></div>"
    );
    sco++;
    score.textContent = sco;
    if (sco % 2 === 0 && sco < 10) {
      lev++;
      level.textContent = lev + 1;
    }
  }
  //获取猫尾巴
  const cattail = catBody[catBody.length - 1];
  // 将猫尾巴的位置移动到下一个要走的位置
  cattail.style.left = x + "px";
  cattail.style.top = y + "px";
  //移动后猫尾巴变成猫头
  cats.insertAdjacentElement("afterbegin", cattail);

  setTimeout(auto, 300 - sco * 30);
}
//==================================================================
//重置游戏内容函数
function reset() {
  //重置猫的位置
  for (let i = catBody.length - 1; i > 0; i--) {
    catBody[i].remove();
  }

  const catHead = catBody[0];
  catHead.style.left = 10 + "px";
  catHead.style.top = 10 + "px";
  //重置鱼的位置
  fish.style.left = 100 + "px";
  fish.style.top = 120 + "px";
  //重置获取的按键
  fang = 0;
  //重置得分
  sco = 0;
  score.textContent = sco;
  sev = 1;
  level.textContent = sev;
}
//游戏结束后，是否再来一把的函数
function gameover() {
  alert("你最终获得的分数是：" + sco);
  let start = confirm("游戏结束，是否再来一把？");
  if (start) {
    reset();
    setTimeout(auto, 400);
  } else {
    reset();
    Introduction.style.zIndex = 1;
  }
}

//====================================================================
//获取移动的方向
let fang = 0;
document.addEventListener("keydown", (event) => {
  if (keyKey.includes(event.key)) {
    if (catBody.length < 2 || event.key !== keyKe[fang]) fang = event.key;
  }
});

// 点击开始按钮，进入游戏界面
button.onclick = function () {
  Introduction.style.zIndex = -1;
  setTimeout(auto, 400);
};

/* 
提示撞墙后，点确定可以重新开始游戏，点取消回到初始页面
点击开始游戏后，再执行代码
俩个页面，第一个页面介绍游戏，点击开始游戏后，进入游戏页面，刚开始猫默认向右走

增加苹果，可以提高得分 */
