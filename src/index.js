import './style.css';
import MessagesData from './messages.json';

import $ from 'jquery-slim';

import {live} from './ludolf';

const Messages = new terminal.JsEditorMessages(MessagesData);

$(function () {
    document.title = Messages.msg('title');
    $('#helpDiv').html(Messages.msg('help'));

    $('#ludolf_ludolf').appendTo('#workspace').show();

//    var tl_blinking = new TimelineMax({repeat:-1, repeatDelay:0.2, paused:true})
//      .to('#ludolf_light', 0.2, {fill:blink})
//      .to('#ludolf_light', 0.5, {fill:black, delay:0.2});
//
//    var tl_dance = new TimelineMax({repeat:-1, repeatDelay:0, paused:true})
//      .add(rightHandUp, 0)
//      .add(rightHandDown, 1)
//      .add(leftHandUp, 1)
//      .add(leftHandDown, 2)
//      .add(rightLegUp, 1)
//      .add(rightLegDown, 2)
//      .add(leftLegUp, 0)
//      .add(leftLegDown, 1);
    
    live();

    //tl_blinking.resume();
    //tl_dance.resume();
});