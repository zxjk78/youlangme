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
import MsgBoxNews from './components/MsgBoxNews';
import { API_URL } from '../../../../common/api/http-config';
import { translate } from '../../matchAPI';
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
      // 번역 관련 state 2
      myLanguage: props.myLanguage,
      yourLanguage: props.yourLanguage,
      // 뉴스 관련 state 1
      newsInfo: props.newsInfo,
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
    // this.handleReplyPressKey = this.handleReplyPressKey.bind(this);
    // 댓글 답글 컴포넌트 삭제
    this.cancelReply = this.cancelReply.bind(this);
    // 스크롤 테스트
    this.scrollReplyTarget = this.scrollReplyTarget.bind(this);
    this.addToMsgBoxRefs = this.addToMsgBoxRefs.bind(this);
    this.addToMsgBoxContentRefs = this.addToMsgBoxContentRefs.bind(this);
    this.msgTranslate = this.msgTranslate.bind(this);
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
          type: data.type,
          newsInfo: data.newsInfo,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            'userImg-' + (this.state.messageList.length - 1)
          );
          // 71, 74번째 줄 유저 프사 담는 부분 : 매칭상황이 바뀌었기 때문에 확인해서 props로 유저값 넘겨주는거 어떻게되는지 알아보아야 함.
          console.log('채팅창 유저정보:', this.props.user);
          // const video = document.getElementById('video-' + data.streamId);
          const avatar = userImg.getContext('2d');
          const profileImage = new Image();
          profileImage.onload = () => {
            avatar.drawImage(profileImage, 0, 0, 60, 60);
          };
          profileImage.src = `${API_URL}image/profile/${this.props.userId}.jpg`;
          // avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);

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
  // 뉴스 채팅창에 띄우기
  componentDidUpdate(prevProps) {
    if (this.props.newsInfo !== prevProps.newsInfo) {
      // console.log('뉴스URL 업데이트 감지', this.props.newsInfo);
      // DidUpdate에서 setState 호출시 무한루프 가능하니까 예의주시
      this.setState({ newsInfo: this.props.newsInfo });
      this.sendMessage(3, { message: '뉴스', newsInfo: this.props.newsInfo });
    }
  }

  handleChange(val) {
    this.setState({ message: val });
  }

  handlePressKey(event) {
    this.sendMessage(1, { message: this.state.message });
  }
  // handleReplyPressKey(event) {
  //   this.sendMessage(2, {
  //     message: this.state.message,
  //     originMsg: this.state.originalMessage,
  //     originIdx: this.state.originalMessageIdx,
  //   });
  // }
  // messageType: 1 :normal, 2: reply, 3: news
  sendMessage(msgType, data) {
    // console.log('메세지 보낼때 데이터', msgType, data);
    let message = data.message.replace(/ +(?= )/g, '');
    let originalMsg = '';
    let originalMsgIdx = '';
    let newsInfo = null;
    if (this.props.user && message) {
      if (msgType === 1) {
        message = data.message.replace(/ +(?= )/g, '');
      } else if (msgType === 2) {
        message = data.message.replace(/ +(?= )/g, '');
        originalMsg = data.originMsg.replace(/ +(?= )/g, '');
        originalMsgIdx = +data.originIdx;
      } else if (msgType === 3) {
        newsInfo = data.newsInfo;
        // console.log('뉴스 들어옴');
      }
      if ((message !== '' && message !== ' ') || msgType === 3) {
        const msgData = {
          type: msgType,
          message: message,
          originalMessage: originalMsg,
          originalIdx: originalMsgIdx,
          newsInfo: newsInfo,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(msgData),
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
    // console.log(idx + '번 말풍선 번역작업');
    const originalMsg = this.state.messageList[idx].message;
    // console.log('ref랑 연결된 msgBox들', this.msgBoxContentRef.current);
    const target = this.msgBoxContentRef.current[idx];
    // console.log(target);
    const myISOCode = iso_code[this.state.myLanguage];
    const yourISOCode = iso_code[this.state.yourLanguage];
    // const myISOCode = iso_code['KOREAN'];
    // const yourISOCode = iso_code['ENGLISH'];
    const translateMsg = await translate(myISOCode, yourISOCode, originalMsg);
    target.innerText = translateMsg.slice(1, translateMsg.length - 1);
  }
  async copyHandler(idx) {
    // console.log(idx + '번 말풍선 복사작업');
    const copyMsg = this.state.messageList[idx].message;
    await navigator.clipboard.writeText(copyMsg);
  }
  modifyHandler(idx) {
    // console.log(idx + '번 말풍선 교정작업');

    this.setState({
      originalMessageIdx: idx,
      originalMessage: this.state.messageList[idx].message,
      isReply: true,
    });
  }
  handleReply() {
    this.sendMessage(2, {
      message: this.state.message,
      originMsg: this.state.originalMessage,
      originIdx: this.state.originalMessageIdx,
    });
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
    target.classList.add('move');
    setTimeout(() => {
      target.classList.remove('move');
    }, 2000);
  }
  cancelReply() {
    this.setState({
      originalMessageIdx: null,
      originalMessage: '',
      isReply: false,
    });
  }

  async msgTranslate() {
    // const myISOCode = iso_code['KOREAN'];
    // const yourISOCode = iso_code['ENGLISH'];
    const myISOCode = iso_code[this.state.myLanguage];
    const yourISOCode = iso_code[this.state.yourLanguage];
    const originContent = this.state.message.trim();
    if (originContent.length === 0) {
      return;
    }

    console.log(this.state.myLanguage, this.state.yourLanguage);
    console.log(yourISOCode, myISOCode, originContent);
    const translateMsg = await translate(yourISOCode, myISOCode, originContent);
    this.setState({
      message: translateMsg.slice(1, translateMsg.length - 1),
    });
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };

    return (
      <div id="chatContainer">
        <div
          class={`chatComponent ${this.state.isReply && 'reply'}`}
          style={styleChat}
        >
          <div id="chatToolbar">
            <div>상대방과의 대화</div>
            <div id="chat-closeButton" onClick={this.close}>
              <HighlightOff />
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
                      {data.type === 2 ? (
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
                      ) : data.type === 1 ? (
                        <div data-msgidx={i}>
                          <MsgBoxNormal
                            className="text"
                            message={data.message}
                            ref={this.addToMsgBoxContentRefs}
                          />
                        </div>
                      ) : (
                        <div data-msgidx={i}>
                          <MsgBoxNews
                            className="text"
                            newsInfo={data.newsInfo}
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
          <div className="msgInput">
            {!this.state.isReply ? (
              <div className="message-input-normal">
                <MessageInputNormal
                  messageVal={this.state.message}
                  handleChange={this.handleChange}
                  handleKeyPress={this.handlePressKey}
                  sendBtnClick={this.sendMessage}
                  msgTranslate={this.msgTranslate}
                />
              </div>
            ) : (
              <div className="message-input-reply">
                <MessageInputReply
                  originalMessage={this.state.originalMessage}
                  originalMessageIdx={this.state.originalMessageIdx}
                  messageVal={this.state.message}
                  handleChange={this.handleChange}
                  handleKeyPress={this.handleReplyPressKey}
                  sendReplyBtnClick={this.sendMessage}
                  cancelModify={this.cancelReply}
                />
              </div>
            )}
          </div>
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
