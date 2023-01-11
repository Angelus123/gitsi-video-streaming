import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useState } from "react";
import "./jitsi.css";

const MeetApp = () => {
  const apiRef = useRef();
  const [updateLog] = useState([]);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);

  const printEventOutput = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog((items) => [...items, `${feature} off`]);
    } else {
      updateLog((items) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand("toggleChat");
    updateLog((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
  };

  const handleKnockingParticipant = (payload) => {
    updateLog((items) => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants((participants) => [
      ...participants,
      payload?.participant,
    ]);
  };

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.border = "10px solid #3d3d3d";
    iframeRef.style.background = "#3d3d3d";
    iframeRef.style.height = "100vh";
  };

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "audio")
    );
    apiRef.current.on("videoMuteStatusChanged", (payload) =>
      handleAudioStatusChange(payload, "video")
    );
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    alert("Ready to close...");
  };

  const generateRoomName = () =>
    `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

  const renderSpinner = () => <div className="loadingSpiner">Loading..</div>;

  return (
    <React.Fragment>
      <div>
        <JitsiMeeting
          roomName={generateRoomName()}
          spinner={renderSpinner}
          config={{
            subject: "lalalala",
            hideConferenceSubject: false,
          }}
          onApiReady={(externalApi) => handleApiReady(externalApi)}
          onReadyToClose={handleReadyToClose}
          getIFrameRef={handleJitsiIFrameRef1}
        />
       
      </div>
    </React.Fragment>
  );
};

export default MeetApp;
