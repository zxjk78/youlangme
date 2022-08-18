import React, { Component } from 'react';
import './ToolbarComponent.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

// youlangme custom
import IconButton from '@material-ui/core/IconButton';
import styled from '@emotion/styled';
import LowerToolBarMenuItem from './components/LowerToolBarMenuItem';
import MenuSpeedDial from '../components/MenuSpeedDial';
import ExtraMenuButton from '../UI/ExtraMenuButton';

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      myNationality: this.props.myNationality,
      yourNationality: this.props.yourNationality,
    };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }
  toggleHelpModal() {
    // console.log('news 이벤트 전달');
    this.props.toggleHelpModal();
  }
  onbeforeunload() {
    // console.log('채팅종료 이벤트 전달');
    this.props.onbeforeunload();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    console.log(localUser);
    return (
      <div className="header">
        {/* <div id="navSessionInfo">
          {this.props.sessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div> */}

        <div className="buttonsContent">
          <LowerToolBarMenuItem
            activate={{
              text: '비디오 시작',
              icon: <VideocamOff color="secondary" />,
            }}
            deactivate={{
              text: '비디오 종료',
              icon: <Videocam />,
            }}
            activateStatus={true}
            activateFn={this.camStatusChanged}
            deactivateFn={this.camStatusChanged}
            // activateStatus={this.props.user.isVideoActive()}
          />
          <LowerToolBarMenuItem
            activate={{
              text: '음소거 해제',
              icon: <MicOff color="secondary" />,
            }}
            deactivate={{
              text: '음소거',
              icon: <Mic />,
            }}
            activateStatus={true}
            activateFn={this.micStatusChanged}
            deactivateFn={this.micStatusChanged}
            // activateStatus={this.props.user.isAudioActive()}
          />
          {/* <LowerToolBarMenuItem
            activate={{
              text: '화면공유 켜기',
              icon: <ScreenShare />,
            }}
            deactivate={{
              text: '화면공유 끄기',
              icon: <ScreenShare />,
            }}
            activateFn={this.screenShare}
            deactivateFn={this.stopScreenShare}
          /> */}
          <LowerToolBarMenuItem
            activate={{
              text: '채팅 켜기',
              icon: <QuestionAnswer />,
            }}
            deactivate={{
              text: '채팅 끄기',
              icon: <QuestionAnswer />,
            }}
            activateFn={this.toggleChat}
            deactivateFn={this.toggleChat}
          />
          <ExtraMenuButton
            news={this.toggleHelpModal}
            quit={this.onbeforeunload}
            myNationality={this.props.myNationality}
            yourNationality={this.props.yourNationality}
          />
        </div>
      </div>
    );
  }
}
