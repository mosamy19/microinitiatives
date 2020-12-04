import React from "react";
import Popover from "@material-ui/core/Popover";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

import styled from "styled-components";

const Sharemodal = ({ handleClose, anchorEl, title, handleShare }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const shareUrl = window.location.href;

  return (
    <Wrapper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="popup" style={{ padding: "5px" }}>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            onShareWindowClose={handleShare}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            onShareWindowClose={handleShare}
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            onShareWindowClose={handleShare}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            onShareWindowClose={handleShare}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            onShareWindowClose={handleShare}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TelegramShareButton
            url={shareUrl}
            title={title}
            onShareWindowClose={handleShare}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
      </Popover>
    </Wrapper>
  );
};

export default Sharemodal;
const Wrapper = styled.div`
  .popup {
    button {
      padding: 0 4px !important;
      &:focus {
        outline: none;
      }
    }
  }
`;
