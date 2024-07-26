import { useState } from "react";
import YouTube from "react-youtube";

interface YoutubeVideoProps {
  videoId: string;
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ videoId }) => {
  const [player, setPlayer] = useState<YouTube | null>(null);

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const opts: any = {
    height: "auto",
    width: "auto",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube
        videoId={videoId}
        id={videoId}
        className={""}
        iframeClassName={""}
        title={"Title"}
        opts={opts}
        onReady={onReady}
      />
    </div>
  );
};

export default YoutubeVideo;
