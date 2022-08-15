import { useState } from 'react';
import StartChat from './beforeMatching/StartChat';
import LoadingChat from './beforeMatching/LoadingChat';
import ConfirmChat from './beforeMatching/ConfirmChat';

const StartMatching = () => {
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchConfirm, setMatchConfirm] = useState(false);
  const [matching, setMatching] = useState(false);

  const [sessionId, setSessionId] = useState('');
  const [opponentId, setOpponentId] = useState(null);
  const [myLanguage, setMyLanguage] = useState(null);
  const [yourLanguage, setYourLanguage] = useState(null);
  const [myData, setMyData] = useState(null);
  const [yourData, setYourData] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [yourProfile, setYourProfile] = useState(null);
  console.log(sessionId);

  if (!matchLoading && !matchConfirm) {
    return (
      <StartChat
        setMyLanguage={setMyLanguage}
        setYourLanguage={setYourLanguage}
        setMatchLoading={setMatchLoading}
        setMatchConfirm={setMatchConfirm}
        setSessionId={setSessionId}
        setOpponentId={setOpponentId}
      ></StartChat>
    );
  } else if (matchLoading) {
    return <LoadingChat></LoadingChat>;
  } else if (!matchLoading && matchConfirm) {
    return (
      <ConfirmChat
        myLanguage={myLanguage}
        yourLanguage={yourLanguage}
        sessionId={sessionId}
        setMatching={setMatching}
        setMyData={setMyData}
        setYourData={setYourData}
        setMyProfile={setMyProfile}
        setYourProfile={setYourProfile}
        matchConfirm={matchConfirm}
        setMatchConfirm={setMatchConfirm}
        setSessionId={setSessionId}
        setOpponentId={setOpponentId}
        opponentId={opponentId}
      ></ConfirmChat>
    );
  }
};
export default StartMatching;
