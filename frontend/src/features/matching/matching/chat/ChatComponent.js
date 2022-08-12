import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Send from '@material-ui/icons/Send';

import './ChatComponent.scss';
import { Tooltip } from '@material-ui/core';

// youlangme custom
import ChatContextMenu from './components/ChatContextMenu';
import MessageInputNormal from './components/MessageInputNormal';
import MessageInputReply from './components/MessageInputReply';
import MsgBoxNormal from './components/MsgBoxNormal';
import MsgBoxReply from './components/MsgBoxReply';
import translate from 'translate-google-api';
import { iso_code } from '../../../../common/utils/data/nationalityData';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
      // youlangmeCustum
      // context 메뉴 관련 state 4
      isCMenuVisible: false,
      clX: null,
      clY: null,
      targetMsgIdx: 0,
      // 답글 관련 state 3
      originalMessage: '',
      originalMessageIdx: null,
      isReply: false,
      // 번역 관련 state 1
      myNationality: props.myNationality,
      // myNationality: 'KOREA',
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    // youlangme custom
    // 메뉴 보여주기 위해 이벤트
    this.showContextMenu = this.showContextMenu.bind(this);
    // 자식 contextMenu의 요청
    this.modifyHandler = this.modifyHandler.bind(this);
    this.copyHandler = this.copyHandler.bind(this);
    this.translateHandler = this.translateHandler.bind(this);
    // 댓글 답글 컴포넌트 요청
    this.handleReply = this.handleReply.bind(this);
    // 댓글 답글 컴포넌트 삭제
    this.cancelReply = this.cancelReply.bind(this);
    // 스크롤 테스트
    this.scrollReplyTarget = this.scrollReplyTarget.bind(this);
    this.addToMsgBoxRefs = this.addToMsgBoxRefs.bind(this);
    this.addToMsgBoxContentRefs = this.addToMsgBoxContentRefs.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          // youlangme custom
          originalMessage: data.originalMessage,
          originalIdx: data.originalIdx,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            'userImg-' + (this.state.messageList.length - 1)
          );
          // 71, 74번째 줄 유저 프사 담는 부분 : 매칭상황이 바뀌었기 때문에 확인해서 props로 유저값 넘겨주는거 어떻게되는지 알아보아야 함.
          // const profileImage = new Image();
          // profileImage.src = `${API_URL}image/profile/${this.props.user.id}.jpg`;
          const video = document.getElementById('video-' + data.streamId);
          const avatar = userImg.getContext('2d');
          avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
    document.addEventListener('click', () => {
      this.setState({ isCMenuVisible: false });
    });
    // -------------  youlangme custom
    this.msgBoxRef = React.createRef();
    this.msgBoxRef.current = [];
    this.msgBoxContentRef = React.createRef();
    this.msgBoxContentRef.current = [];
  }

  handleChange(val) {
    this.setState({ message: val });
  }

  handlePressKey(event) {
    this.sendMessage();
  }

  sendMessage() {
    const [originMsg, originIdx] = [
      this.state.originalMessage,
      this.state.originalMessageIdx,
    ];
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, '');
      let originalMsg = originMsg.replace(/ +(?= )/g, '');
      let originalMsgIdx = +originIdx;

      if (message !== '' && message !== ' ') {
        const data = {
          message: message,
          originalMessage: originalMsg,
          originalIdx: originalMsgIdx,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
    this.setState({ message: '' });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }
  //---------------------- youlangme custom ------------------------------

  showContextMenu(event) {
    event.preventDefault();
    const idx = event.currentTarget.dataset.idx;
    this.setState({
      clX: event.clientX,
      clY: event.clientY,
      isCMenuVisible: true,
      targetMsgIdx: idx,
    });
  }
  async translateHandler(idx) {
    console.log(idx + '번 말풍선 번역작업');
    const originalMsg = this.state.messageList[idx].message;
    const target = this.msgBoxContentRef.current[idx];
    const isoCode = iso_code[this.state.myNationality];
    console.log(target);
    const translateMsg = await translate(originalMsg, {
      to: isoCode,
    });
    target.innerText = translateMsg;
    // target.innerText = '121212121';
  }
  async copyHandler(idx) {
    console.log(idx + '번 말풍선 복사작업');
    const copyMsg = this.state.messageList[idx].message;
    await navigator.clipboard.writeText(copyMsg);
  }
  modifyHandler(idx) {
    console.log(idx + '번 말풍선 교정작업');

    this.setState({
      originalMessageIdx: idx,
      originalMessage: this.state.messageList[idx].message,
      isReply: true,
    });
  }
  handleReply() {
    this.sendMessage();
    this.setState({
      originalMessageIdx: null,
      originalMessage: '',
      isReply: false,
    });
  }
  addToMsgBoxRefs(el) {
    if (el && !this.msgBoxRef.current.includes(el)) {
      this.msgBoxRef.current.push(el);
    }
  }
  addToMsgBoxContentRefs(el) {
    if (el && !this.msgBoxContentRef.current.includes(el)) {
      this.msgBoxContentRef.current.push(el);
    }
  }

  scrollReplyTarget(event) {
    const parentIdx = event.currentTarget.dataset.origin;
    const target = this.msgBoxRef.current[parentIdx];
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  cancelReply() {
    this.setState({
      originalMessageIdx: null,
      originalMessage: '',
      isReply: false,
    });
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="chatToolbar">
            <div>
              {/* {this.props.user.getStreamManager().stream.session.sessionId} -
              CHAT */}
              상대방과의 대화
            </div>
            <div id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </div>
          </div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <>
                <div
                  key={i}
                  id={'remoteUsers' + i}
                  className={
                    'message' +
                    (data.connectionId !== this.props.user.getConnectionId()
                      ? ' left'
                      : ' right')
                  }
                  ref={this.addToMsgBoxRefs}
                >
                  <canvas
                    id={'userImg-' + i}
                    width="60"
                    height="60"
                    className="user-img"
                  />
                  <div
                    className="msg-detail"
                    onContextMenu={this.showContextMenu}
                    data-idx={i}
                  >
                    <div className="msg-info">
                      <p> {data.nickname}</p>
                    </div>
                    <div className="msg-content">
                      <span className="triangle" />
                      {data.originalMessage.length > 0 ? (
                        <div
                          data-origin={data.originalIdx}
                          onClick={this.scrollReplyTarget}
                        >
                          <MsgBoxReply
                            className="text"
                            message={data.message}
                            originalMessage={data.originalMessage}
                            ref={this.addToMsgBoxContentRefs}
                          />
                        </div>
                      ) : (
                        <div data-msgidx={i}>
                          <MsgBoxNormal
                            className="text"
                            message={data.message}
                            ref={this.addToMsgBoxContentRefs}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {!this.state.isReply ? (
            <MessageInputNormal
              messageVal={this.state.message}
              handleChange={this.handleChange}
              handleKeyPress={this.handlePressKey}
              sendBtnClick={this.sendMessage}
            />
          ) : (
            <MessageInputReply
              originalMessage={this.state.originalMessage}
              messageVal={this.state.message}
              handleChange={this.handleChange}
              handleKeyPress={this.handlePressKey}
              sendReplyBtnClick={this.handleReply}
              cancelModify={this.cancelReply}
            />
          )}
          {/* 오른쪽 버튼 클릭 시 메뉴 */}
          {this.state.isCMenuVisible && (
            <ChatContextMenu
              clientX={this.state.clX}
              clientY={this.state.clY}
              target={this.state.targetMsgIdx}
              modify={this.modifyHandler}
              copy={this.copyHandler}
              translate={this.translateHandler}
            />
          )}
        </div>
      </div>
    );
  }
}
