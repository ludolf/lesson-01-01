import $ from 'jquery-slim';

const origWidth = 322;
const origHeight = 372;

const blackColor = '#434343';
const blinkColor = '#00ff00';

var ratio = 1;

var timeline = new TimelineLite({paused:true});
var handsTL = new TimelineLite({paused:true});
var legsTL = new TimelineLite({paused:true});

export const rightHandUp = function () {
  handsTL.add([
    TweenMax.to('#ludolf_arm_right', 1, {scaleY:-1, y:50*ratio}),
    TweenMax.to('#ludolf_hand_right', 1, {y:-200*ratio})
  ]);
}

export const rightHandDown = function () {
  handsTL.add([
    TweenMax.to('#ludolf_arm_right', 1, {scaleY:1, y:0}),
    TweenMax.to('#ludolf_hand_right', 1, {y:0})
  ]);
}

export const leftHandUp = function () {
  handsTL.add([
    TweenMax.to('#ludolf_arm_left', 1, {scaleY:-1, y:50*ratio}),
    TweenMax.to('#ludolf_hand_left', 1, {y:-200*ratio})
  ]);
}

export const leftHandDown = function () {
  handsTL.add([
    TweenMax.to('#ludolf_arm_left', 1, {scaleY:1, y:0}),
    TweenMax.to('#ludolf_hand_left', 1, {y:0})
  ]);
}

export const rightLegUp = function () {
  legsTL.add([
    TweenMax.to('#ludolf_leg_right', 1, {y:-15*ratio})
  ]);
}

export const rightLegDown = function () {
  legsTL.add([
    TweenMax.to('#ludolf_leg_right', 1, {y:0})
  ]);
}

export const leftLegUp = function () {
  legsTL.add([
    TweenMax.to('#ludolf_leg_left', 1, {y:-15*ratio})
  ]);
}

export const leftLegDown = function () {
  legsTL.add([
    TweenMax.to('#ludolf_leg_left', 1, {y:0})
  ]);
}

export const blink = function () {
  timeline.add([
    TweenMax.to('#ludolf_light', 1, {fill:blinkColor})
  ]);
  timeline.add([
    TweenMax.to('#ludolf_light', 1, {fill:blackColor})
  ]);
}

var liveTimer;
var buttonsSet = false;

export const live = function () {
  clearTimeout(liveTimer);

  const ludolf = $('#ludolf_ludolf');

  ratio = ludolf.width() / origWidth;

  TweenMax.set('#ludolf_robot', {scaleY:ratio, scaleX:ratio});

  function eyelight() {
    const repeat = Math.round(Math.random());
    new TimelineMax({repeat:repeat})
      .to('#ludolf_eyelight_left', 0.2, {rotation:20, transformOrigin: '0 100%'})
      .to('#ludolf_eyelight_left', 0.3, {rotation:0});
    new TimelineMax({repeat:repeat})
      .to('#ludolf_eyelight_right', 0.2, {rotation:20, transformOrigin: '0 100%'})
      .to('#ludolf_eyelight_right', 0.3, {rotation:0});
  }

  function eyebrow() {
    const repeat = Math.round(Math.random() + 0.2);
    new TimelineMax({repeat:repeat})
      .to('#ludolf_eyebrow_right', 0.1, {y:0, x:-5*ratio, rotation:10, transformOrigin: '100% 0%'})
      .to('#ludolf_eyebrow_right', 0.3, {y:0, x:0, rotation:0});
    new TimelineMax({repeat:repeat})
      .to('#ludolf_eyebrow_left', 0.1, {y:0, x:5*ratio, rotation:-10, transformOrigin: '0% 100%'})
      .to('#ludolf_eyebrow_left', 0.3, {y:0, x:0, rotation:0});
  }

  function nose() {
    new TimelineMax()
      .to('#ludolf_nose', 0.2, {y:-5*ratio})
      .to('#ludolf_nose', 0.1, {y:0});
  }

  function buttons() {
    if (buttonsSet) return;
    buttonsSet = true;

    const yellow1 = '#ffe599';
    const yellow2 = '#e0c988';
    const red1 = '#cc5858';
    const red2 = '#ac5858';

    function changeColor1a() {
      TweenMax.to('#ludolf_button_square', 0.5, {fill:red1});
      TweenMax.to('#ludolf_button_square_line', 0.5, {stroke:red1});
    }

    function changeColor1b() {
      TweenMax.to('#ludolf_button_triangle', 0.3, {fill:yellow1});
      TweenMax.to('#ludolf_button_triangle_line', 0.3, {stroke:yellow1});
    }

    function changeColor1c() {
      TweenMax.to('#ludolf_bottom3', 0.2, {fill:yellow1});
      TweenMax.to('#ludolf_bottom3_line', 0.2, {stroke:yellow1});
    }

    function changeColor2a() {
      TweenMax.to('#ludolf_button_square', 0.5, {fill:red2});
      TweenMax.to('#ludolf_button_square_line', 0.5, {stroke:red2});
    }

    function changeColor2b() {
      TweenMax.to('#ludolf_button_triangle', 0.3, {fill:yellow2});
      TweenMax.to('#ludolf_button_triangle_line', 0.3, {stroke:yellow2});
    }

    function changeColor2c() {
      TweenMax.to('#ludolf_bottom3', 0.2, {fill:yellow2});
      TweenMax.to('#ludolf_bottom3_line', 0.2, {stroke:yellow2});
    }

    new TimelineMax({repeat:-1})
      .add(changeColor2a, 0.2)
      .add(changeColor1a, 0.4);
    new TimelineMax({repeat:-1})
      .add(changeColor2b, 2)
      .add(changeColor1b, 3);
    new TimelineMax({repeat:-1})
      .add(changeColor2c, 1.0)
      .add(changeColor1c, 1.5);
  }

  function body() {
    new TimelineMax()
      .to('#ludolf_body', 0.5, {y:-2*ratio, rotation:1, transformOrigin: '50% 100%'})
      .to('#ludolf_body', 0.5, {y:-2*ratio, rotation:-1, transformOrigin: '50% 100%'})
      .to('#ludolf_body', 0.5, {y:0, rotation:0});
  }

  const motions = [body, eyelight, nose, eyebrow, eyebrow];

  (function _live() {
      const next = Math.floor(Math.random() * motions.length);
      motions[next]();
      liveTimer = setTimeout(_live, Math.floor((Math.random() * 3) + 2) * 1000);
  })();
  buttons();
}

export const say = function(text) {
console.log('saying text', text)
  $('#marquee p').html(text);
}

export const pause = function () {
  timeline = new TimelineLite({paused:true});
  handsTL = new TimelineLite({paused:true});
  legsTL = new TimelineLite({paused:true});
}

export const resume = function () {
  timeline.resume();
  handsTL.resume();
  legsTL.resume();
}