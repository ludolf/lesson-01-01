import './style.css';
import MessagesData from './messages.json';

import $ from 'jquery-slim';

const Messages = new terminal.JsEditorMessages(MessagesData);

$(function () {
    document.title = Messages.msg('title');
});